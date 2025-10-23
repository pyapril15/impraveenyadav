interface FestivalItem {
  name: string;
  date: string;
  day?: string;
  month?: string;
  type?: string;
  religion?: string;
  source?: string;
}

interface CountdownResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isToday: boolean;
}

const festivalUtil = {
  // 🕐 Get the next upcoming festival from a list
  getNextFestival: (festivals: FestivalItem[]): (FestivalItem & { dateObj: Date }) | null => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcomingFestivals = festivals
      .map((festival) => ({
        ...festival,
        dateObj: new Date(festival.date),
      }))
      .filter((festival) => festival.dateObj.getTime() >= today.getTime())
      .sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime());

    return upcomingFestivals[0] || null;
  },

  // ⏳ Calculate countdown until a given date
  calculateCountdown: (targetDate: string | Date): CountdownResult => {
    const now = new Date();
    const target = new Date(targetDate);
    target.setHours(0, 0, 0, 0);

    const diff = target.getTime() - now.getTime();

    if (diff < 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isToday: false };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, isToday: days === 0 };
  },

  // 📅 Format a date into readable string
  formatDate: (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  },
};

export default festivalUtil;
