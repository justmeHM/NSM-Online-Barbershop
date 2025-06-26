export default function UnauthorizedPage() {
  return (
    <div className="flex justify-center items-center min-h-screen text-center p-8">
      <h1 className="text-4xl font-bold mb-4 text-red-600">Access Denied</h1>
      <p className="text-lg">You do not have permission to view this page.</p>
    </div>
  );
}
