export function ClientsTable({ clients }: { clients: any[] }) {
  return (
    <div className="rounded-md border">
      <table className="w-full table-auto">
        <thead className="bg-muted text-muted-foreground text-sm">
          <tr>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Type</th>
            <th className="p-2 text-right">Monthly</th>
            <th className="p-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((c) => (
            <tr key={c.id} className="border-t">
              <td className="p-2">{c.name}</td>
              <td className="p-2">{c.businessType}</td>
              <td className="p-2 text-right">R{c.monthlyValue ?? 0}</td>
              <td className="p-2">{c.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
