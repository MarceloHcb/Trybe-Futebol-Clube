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

  async getLeaderboard() {
    const teams = await this.teamModel.findAll();
    const match = await this.matchModel.findAllMatches(false);
    return this.sortLeaderboard(teams.map((team: ITeam) => {
      const [totalGames, totalVictories, totalDraws, totalLosses, goalsFavor,
        goalsOwn, totalPoints, goalsBalance, efficiency] = this.calculateTeamStats(match, team);
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

  calculateTeamStats = (match: IMatch[], team: ITeam) => {
    const homeTeam = match.filter((m: IMatch) => m.homeTeamId === team.id);
    const totalGames = homeTeam.length;
    const totalVictories = homeTeam.filter((m: IMatch) => m.homeTeamGoals > m.awayTeamGoals).length;
    const totalDraws = homeTeam.filter((m: IMatch) => m.homeTeamGoals === m.awayTeamGoals).length;
    const totalLosses = homeTeam.filter((m: IMatch) => m.homeTeamGoals < m.awayTeamGoals).length;
    const goalsFavor = homeTeam.reduce((acc: number, m: IMatch) => acc + m.homeTeamGoals, 0);
    const goalsOwn = homeTeam.reduce((acc: number, m: IMatch) => acc + m.awayTeamGoals, 0);
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
