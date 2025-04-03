import { Skeleton } from "@/components/ui/skeleton";
/*
  * Loading component for Next.js applications
  * This component is displayed while the main content is loading.
  * It includes a logo animation, a loading message, and skeleton placeholders.
  * The design is responsive and uses Tailwind CSS for styling.
  * 
  * @returns {JSX.Element} The loading component.
  */
export default function Loading() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center space-y-8 bg-background p-6">
      {/* Animated logo with looping orbit effect */}
      
      <div className="relative h-24 w-24">
        <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 animate-[orbit_4s_linear_infinite] rounded-full bg-primary">
          <div className="absolute -left-1 -top-1 h-5 w-5 rounded-full bg-primary/20"></div>
        </div>
        <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 animate-[orbitReverse_3s_linear_infinite] rounded-full bg-secondary">
          <div className="absolute -left-1 -top-1 h-5 w-5 rounded-full bg-secondary/20"></div>
        </div>
        <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 animate-[orbit_5s_linear_infinite] rounded-full bg-accent">
          <div className="absolute -left-1 -top-1 h-5 w-5 rounded-full bg-accent/20"></div>
        </div>
        <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/80"></div>
      </div>

      {/* Animated text with gradient */}
      <div className="space-y-2 text-center">
        <h1 className="animate-gradient bg-gradient-to-r from-primary to-secondary bg-clip-text text-2xl font-bold text-transparent">
          برجاء الانتظار
        </h1>
        <p className="text-sm text-muted-foreground">
          لحظات من فضلك، نحن نقوم بتحميل المحتوى الخاص بك
        </p>
      </div>

      {/* shadcn Skeletons with creative layout */}
      <div className="grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="group relative overflow-hidden rounded-xl border p-4 shadow-sm transition-all hover:shadow-md"
          >
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-background via-primary/5 to-background opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="flex space-x-4">
              <Skeleton
                className={`h-16 w-16 rounded-lg ${item % 2 === 0 ? "bg-primary/20" : "bg-secondary/20"
                  }`}
              />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <div className="flex space-x-2 pt-2">
                  <Skeleton className="h-4 w-12 rounded-full" />
                  <Skeleton className="h-4 w-12 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating dots background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute h-2 w-2 animate-float rounded-full bg-primary/20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${10 + Math.random() * 20}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>


    </div>
  );
}