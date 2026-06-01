import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ExternalLink, Trophy, Code2, Target } from 'lucide-react';
import ReactGA from 'react-ga4';

interface LeetcodeStats {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  ranking: number;
}

export default function LeetcodeProfile() {
  const [stats, setStats] = useState<LeetcodeStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(
          'https://leetcode-api-faisalshohag.vercel.app/jeevanu345'
        );
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching LeetCode stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleProfileClick = () => {
    ReactGA.event({
      category: 'Link.Click',
      action: 'LeetCode Profile Click',
    });
    window.open('https://leetcode.com/u/jeevanu345/', '_blank');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!stats) return null;

  const easyPercent = Math.round((stats.easySolved / stats.totalEasy) * 100);
  const mediumPercent = Math.round(
    (stats.mediumSolved / stats.totalMedium) * 100
  );
  const hardPercent = Math.round((stats.hardSolved / stats.totalHard) * 100);

  return (
    <Card className="w-full mt-6 bg-card hover:bg-card/90 transition-colors duration-300 border-border/50">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 bg-[#FFA116]/10 rounded-full flex items-center justify-center">
                <Code2 className="text-[#FFA116] h-5 w-5" />
              </div>
              <h3 className="text-2xl font-semibold">LeetCode Profile</h3>
            </div>
            <p className="text-muted-foreground">
              Passionate about algorithms and problem-solving
            </p>
            <div className="mt-4 flex items-center gap-3">
              <Badge
                variant="outline"
                className="flex items-center gap-1.5 py-1"
              >
                <Trophy className="h-3.5 w-3.5 text-yellow-500" />
                <span>Rank: {stats.ranking.toLocaleString()}</span>
              </Badge>
              <Badge
                variant="outline"
                className="flex items-center gap-1.5 py-1"
              >
                <Target className="h-3.5 w-3.5 text-primary" />
                <span>Total Solved: {stats.totalSolved}</span>
              </Badge>
            </div>
          </div>

          <div className="flex-1 w-full md:max-w-md space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-sm">
                <span className="text-[#00b8a3] font-medium">Easy</span>
                <span className="text-muted-foreground">
                  {stats.easySolved} / {stats.totalEasy}
                </span>
              </div>
              <div className="w-full bg-[#00b8a3]/20 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#00b8a3] h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${Math.max(easyPercent, 1)}%` }}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-sm">
                <span className="text-[#ffc01e] font-medium">Medium</span>
                <span className="text-muted-foreground">
                  {stats.mediumSolved} / {stats.totalMedium}
                </span>
              </div>
              <div className="w-full bg-[#ffc01e]/20 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#ffc01e] h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${Math.max(mediumPercent, 1)}%` }}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-sm">
                <span className="text-[#ff375f] font-medium">Hard</span>
                <span className="text-muted-foreground">
                  {stats.hardSolved} / {stats.totalHard}
                </span>
              </div>
              <div className="w-full bg-[#ff375f]/20 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#ff375f] h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${Math.max(hardPercent, 1)}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 min-w-[120px] ml-auto">
            <Button
              variant="outline"
              className="w-full bg-[#FFA116] text-black hover:bg-[#FFA116]/90 hover:text-black border-none"
              onClick={handleProfileClick}
            >
              View Profile
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
