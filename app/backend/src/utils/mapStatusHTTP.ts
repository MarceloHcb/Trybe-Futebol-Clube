export default function mapStatusHTTP(status: string): number {
  switch (status) {
    case 'SUCCESSFUL': return 200;
    case 'NOT_FOUND': return 404;
    case 'UNAUTHORIZED': return 401;
    case 'DUPLICATE': return 422;
    default: return 500;
  }
}
