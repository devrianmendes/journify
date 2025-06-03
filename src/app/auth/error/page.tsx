// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      {params?.error ? (
        <p className="text-sm text-muted-foreground">
          Código do erro: {params.error}
        </p>
      ) : (
        <p className="text-sm text-muted-foreground">
          Um erro não especificado ocorreu.
        </p>
      )}
    </div>
  );
}
