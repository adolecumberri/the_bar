import { Counter } from "../utility";

export const renders = new Counter();

export function useRenderCounter(
  label: string = "default"
): [number | undefined] {
  renders.count(label);

  return [renders.get(label)];
}
