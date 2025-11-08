// hooks/use-toast.ts
export function toast({
  title,
  description,
  variant = "default",
}: {
  title: string;
  description?: string;
  variant?: "default" | "destructive";
}) {
  if (variant === "destructive") {
    console.error(`❌ ${title}: ${description}`);
    alert(`❌ ${title}\n${description ?? ""}`);
  } else {
    console.log(`✅ ${title}: ${description}`);
    alert(`✅ ${title}\n${description ?? ""}`);
  }
}
