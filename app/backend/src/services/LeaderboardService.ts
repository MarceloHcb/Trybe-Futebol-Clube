import Teams from '../models/Teams';
import Match from '../models/Match';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';
import { IMatch } from '../Interfaces/matches/IMatch';
import { ILeaderboard } from '../Interfaces/ILeaderboard';
import { ITeam } from '../Interfaces/teams/ITeam';

export default class LeaderboardService {
  private teamModel: ITeamModel = new Teams();
  private matchModel: IMatchModel = new Match();

  async getLeaderboard(aw:boolean, p:boolean): Promise<ILeaderboard[]> {
    const teams = await this.teamModel.findAll();
    const match = await this.matchModel.findAllMatches(false);
    return this.sortLeaderboard(teams.map((team: ITeam) => {
      const [totalGames, totalVictories, totalDraws, totalLosses, goalsFavor,
        goalsOwn, totalPoints, goalsBalance, efficiency] = this.calculateStats(match, team, aw, p);
      return {
        name: team.teamName,
        totalPoints,
        totalGames,
        totalVictories,
        totalDraws,
        totalLosses,
        goalsFavor,
        goalsOwn,
        goalsBalance,
        efficiency,
      };
    }));
  }

  calculate1 = (match: IMatch[], team:ITeam, aw:boolean) => {
    const Team = match.filter((m: IMatch) => (aw ? m.awayTeamId === team.id
      : m.homeTeamId === team.id));
    const totalGames = Team.length;
    const totalVictories = Team.filter((m: IMatch) => (aw ? m.homeTeamGoals < m.awayTeamGoals
      : m.homeTeamGoals > m.awayTeamGoals)).length;
    const totalDraws = Team.filter((m: IMatch) => m.homeTeamGoals === m.awayTeamGoals).length;
    const totalLosses = Team.filter((m: IMatch) => (aw ? m.homeTeamGoals > m.awayTeamGoals
      : m.homeTeamGoals < m.awayTeamGoals)).length;
    const goalsFavor = Team.reduce((acc: number, m: IMatch) => (aw ? acc + m.awayTeamGoals
      : acc + m.homeTeamGoals), 0);
    const goalsOwn = Team.reduce((acc: number, m: IMatch) => (aw ? acc + m.homeTeamGoals
      : acc + m.awayTeamGoals), 0);
    return [totalVictories, totalLosses, goalsFavor, goalsOwn, totalGames, totalDraws];
  };

  calculate2 = (match:IMatch[], team:ITeam) => {
    const [tV, tL, gF, gO, tG, tD] = this.calculate1(match, team, true);
    const Team = match.filter((m: IMatch) => (m.homeTeamId === team.id
    ));
    const totalGames = Team.length;
    const totalDraws = Team.filter((m: IMatch) => m.homeTeamGoals === m.awayTeamGoals).length;
    const totalVictories = Team.filter((m: IMatch) => (m.homeTeamGoals > m.awayTeamGoals)).length;
    const totalLosses = Team.filter((m: IMatch) => (m.homeTeamGoals < m.awayTeamGoals)).length;
    const goalsFavor = Team.reduce((acc: number, m: IMatch) => (acc + m.homeTeamGoals), 0);
    const goalsOwn = Team.reduce((acc: number, m: IMatch) => (acc + m.awayTeamGoals), 0);
    return [totalVictories + tV, totalLosses + tL, goalsFavor + gF, goalsOwn + gO,
      totalGames + tG, totalDraws + tD];
  };

  calculateStats = (match: IMatch[], team: ITeam, aw:boolean, param:boolean) => {
    const [totalVictories, totalLosses, goalsFavor,
      goalsOwn, totalGames, totalDraws] = !param ? this.calculate1(match, team, aw)
      : this.calculate2(match, team);
    const totalPoints = (totalVictories * 3) + totalDraws;
    const goalsBalance = goalsFavor - goalsOwn;
    const efficiency = +((totalPoints / (totalGames * 3)) * 100).toFixed(2);
    return [totalGames, totalVictories, totalDraws, totalLosses, goalsFavor,
      goalsOwn, totalPoints, goalsBalance, efficiency];
  };

  sortLeaderboard = (leaderboard: ILeaderboard[]) => leaderboard
    .sort((a: ILeaderboard, b: ILeaderboard) => {
      if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
      if (a.totalVictories !== b.totalVictories) return b.totalVictories - a.totalVictories;
      if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance;
      if (a.goalsFavor !== b.goalsFavor) return b.goalsFavor - a.goalsFavor;
      return a.goalsOwn - b.goalsOwn;
    });
}
