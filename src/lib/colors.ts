export interface Color {
  bgColor: string;
  bgHoverColor: string;
}

export interface Colors {
  [key: string]: Color;
}

export const greenColor = {
  bgColor: "bg-green-600",
  bgHoverColor: "bg-green-500"
}

export const colors: Colors = {
  red: { bgColor: "bg-red-600", bgHoverColor: "bg-red-500" },
  orange: { bgColor: "bg-orange-600", bgHoverColor: "bg-orange-500" },
  yellow: { bgColor: "bg-yellow-600", bgHoverColor: "bg-yellow-500" },
  green: greenColor,
  teal: { bgColor: "bg-teal-600", bgHoverColor: "bg-teal-500" },
  blue: { bgColor: "bg-blue-600", bgHoverColor: "bg-blue-500" },
  indigo: { bgColor: "bg-indigo-600", bgHoverColor: "bg-indigo-500" },
  purple: { bgColor: "bg-purple-600", bgHoverColor: "bg-purple-500" },
  pink: { bgColor: "bg-pink-600", bgHoverColor: "bg-pink-500" },
  emerald: { bgColor: "bg-emerald-600", bgHoverColor: "bg-emerald-500" },
  rose: { bgColor: "bg-rose-600", bgHoverColor: "bg-rose-500" },
  gray: { bgColor: "bg-gray-600", bgHoverColor: "bg-gray-500" },
};

