export type homework = {
  chinese: string[];
  math: string[];
  english: string[];
};

export function check_is_homework(homework: homework): Error | homework {
  if (
    !Array.isArray(homework["chinese"]) ||
    !Array.isArray(homework["math"]) ||
    !Array.isArray(homework["english"])
  ) {
    return new Error("错误的homework格式");
  }

  return homework;
}
