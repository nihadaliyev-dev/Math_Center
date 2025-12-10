import React, { useState, useEffect } from "react";
import { User, HardDrive, Star, Trophy, Medal, Award } from "lucide-react";
import { getUserData, getLeaderboard } from "@/services/researchService";
import type { UserData, LeaderboardEntry } from "@/types/researchTypes";

const UserDataCard: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [userDataRes, leaderboardRes] = await Promise.all([
        getUserData(),
        getLeaderboard(),
      ]);
      setUserData(userDataRes);
      setLeaderboard(leaderboardRes);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-4 h-4 text-yellow-500" />;
      case 2:
        return <Medal className="w-4 h-4 text-gray-400" />;
      case 3:
        return <Award className="w-4 h-4 text-amber-600" />;
      default:
        return (
          <span className="text-sm font-semibold text-gray-500">#{rank}</span>
        );
    }
  };

  // Function for future leaderboard feature
  // const getRankColor = (rank: number) => {
  //   switch (rank) {
  //     case 1:
  //       return "bg-gradient-to-r from-yellow-100 to-yellow-50 border-yellow-200";
  //     case 2:
  //       return "bg-gradient-to-r from-gray-100 to-gray-50 border-gray-200";
  //     case 3:
  //       return "bg-gradient-to-r from-amber-100 to-amber-50 border-amber-200";
  //     default:
  //       return "bg-white border-gray-100";
  //   }
  // };

  const formatRating = (rating: number) => {
    return rating.toFixed(1);
  };

  if (loading) {
    return (
      <div className="rounded-[2rem] px-[2rem] py-[1.5rem] bg-white animate-pulse w-full">
        <div className="h-6 bg-gray-200 rounded mb-6"></div>
        <div className="space-y-4 mb-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-4 bg-gray-200 rounded"></div>
          ))}
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-12 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!userData) return null;

  return (
    <div className="rounded-[2rem] px-[2rem] py-[1.5rem] bg-white h-full w-full">
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button className="p-[1.25rem] bg-black rounded-full text-white">
              <User />
            </button>
            <h2 className="text-sm font-medium">My Profile & Ranking</h2>
          </div>
        </div>

        {/* User Stats Section */}
        <div className="mb-6 p-4 bg-[url('/adminHeroSecond.jpg')] bg-cover bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
              <img
                src={userData.avatar}
                alt={userData.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold text-gray-200">{userData.name}</h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-200">
                  Rank #{userData.rank}
                </span>
                {getRankIcon(userData.rank)}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-gray-200" />
              <div>
                <div className="text-gray-400">Data Used</div>
                <div className="font-semibold text-gray-400">
                  {userData.dataUsed}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <div>
                <div className="text-gray-200">Rating</div>
                <div className="font-semibold text-gray-100">
                  {formatRating(userData.rating)}/5.0
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-blue-200">
            <div className="text-sm text-gray-200">Total Documents</div>
            <div className="text-lg font-bold text-gray-100">
              {userData.totalDocuments}
            </div>
          </div>
        </div>

        {/* Leaderboard Section */}
        {/* <div className="flex-1">
          <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-yellow-500" />
            Top Researchers
          </h3>
          
          <div className="space-y-2 overflow-y-auto">
            {leaderboard.map((entry) => (
              <div
                key={entry.id}
                className={`p-3 rounded-lg border transition-all duration-200 ${
                  entry.id === userData.id 
                    ? 'ring-2 ring-blue-200 ' + getRankColor(entry.rank)
                    : getRankColor(entry.rank)
                } hover:shadow-sm`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-6 h-6">
                      {getRankIcon(entry.rank)}
                    </div>
                    <div className="w-8 h-8 rounded-full overflow-hidden border">
                      <img 
                        src={entry.avatar || '/avatars/default.png'} 
                        alt={entry.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className={`text-sm font-medium ${
                        entry.id === userData.id ? 'text-blue-700' : 'text-gray-900'
                      }`}>
                        {entry.name} {entry.id === userData.id && '(You)'}
                      </div>
                      <div className="text-xs text-gray-500">
                        {entry.documentsCount} documents
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-sm font-semibold text-gray-700">
                        {formatRating(entry.rating)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}

        {/* Quick Actions */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex gap-2">
            <button className="flex-1 px-3 py-2 bg-black text-white text-xs rounded-lg hover:bg-gray-800 transition-colors">
              View Full Profile
            </button>
            <button className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 text-xs rounded-lg hover:bg-gray-200 transition-colors">
              View All Rankings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDataCard;
