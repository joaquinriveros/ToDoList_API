import { create } from "zustand";
import { ISprint } from "../types/types";

interface ISprintStore{
    sprints: ISprint[],
    sprintActivo: ISprint | null,
    setSprint: (sprints: ISprint[]) => void,
    setSprintActivo: (sprint: ISprint | null) => void
}

export const sprintStore = create<ISprintStore>((set) => ({
    sprints: [],
    sprintActivo: null,
    setSprint: (sprints_: ISprint[]) => set(()=> ({sprints: sprints_})),
    setSprintActivo: (sprint: ISprint | null) => set(() => ({sprintActivo: sprint}))
}))