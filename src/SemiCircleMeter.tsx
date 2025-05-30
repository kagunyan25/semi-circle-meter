import { motion } from "framer-motion";

export const SemiCircleMeter = ({ value }) => {
  // value は 0 から 100 の値とします
  const radius = 80; // 半径
  const circumference = Math.PI * radius; // 円周の半分（半円の弧長）
  const strokeWidth = 10; // 線の太さ

  // 半円のパスを計算 (例: SVG viewBox="0 0 200 100")
  // 中心 (100, 100) で半径 radius の円の下半分を描画する場合
  // M 100-radius, 100  (左端)
  // A radius,radius 0 0 1 100+radius,100 (円弧を描いて右端へ)
  // 実際にはSVGの座標系に合わせて調整が必要です。
  // ここでは viewBox を (0, 0, radius * 2, radius) とし、中心を (radius, radius) に合わせることを想定
  const d = `M ${strokeWidth / 2},${radius} A ${radius - strokeWidth / 2},${
    radius - strokeWidth / 2
  } 0 0 1 ${radius * 2 - strokeWidth / 2},${radius}`;

  // strokeDashoffset の値を計算
  // value が 0 のとき、線は見えない (circumference)
  // value が 100 のとき、線は完全に見える (0)
  const offset = circumference - (value / 100) * circumference;

  return (
    <svg
      width={radius * 2}
      height={radius + strokeWidth}
      viewBox={`0 0 ${radius * 2} ${radius + strokeWidth / 2}`}
    >
      {/* 背景の薄い半円 (オプション) */}
      <path
        d={d}
        fill="transparent"
        stroke="lightgray"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* メーター部分 */}
      <motion.path
        d={d}
        fill="transparent"
        stroke="blue" // メーターの色
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }} // 初期状態（線が見えない）
        animate={{ strokeDashoffset: offset }} // アニメーション後の状態
        transition={{ duration: 1.5, ease: "easeInOut" }} // アニメーションの調整
      />
      {/* 値の表示 (オプション) */}
      <text x="50%" y="70%" textAnchor="middle" fontSize="24" fontWeight="bold">
        {`${Math.round(value)}%`}
      </text>
    </svg>
  );
};
