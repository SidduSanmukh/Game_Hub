
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Target, Clock, Zap } from "lucide-react";

const StatsSection = () => {
  const stats = [
    {
      label: "Games Won",
      value: "127",
      icon: Trophy,
      color: "text-yellow-500"
    },
    {
      label: "Best Streak",
      value: "15",
      icon: Target,
      color: "text-neon-blue"
    },
    {
      label: "Hours Played",
      value: "48",
      icon: Clock,
      color: "text-neon-purple"
    },
    {
      label: "Achievements",
      value: "23",
      icon: Zap,
      color: "text-neon-green"
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map((stat, index) => (
        <Card key={stat.label} className="glass-card">
          <CardContent className="p-4 text-center">
            <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsSection;
