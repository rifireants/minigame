// lib/api.ts
export async function fetchPoints(): Promise<Point[]> {
  const token = localStorage.getItem("token");
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/points`, {
    headers: { 'Authorization': `Bearer ${token}`, }, // 인증 필요 시
  });
  return res.json();
}

export interface Point {
  id: number;
  userId: number;
  type: 'increase' | 'decrease';
  amount: number;
  reason: string;
  createdAt: string;
}
