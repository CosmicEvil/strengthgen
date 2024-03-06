import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import {ProgramsHomepage} from './programs';

export default async function ServerComponent() {
  const preloaded = await preloadQuery(api.programs.getAllPrograms, {});
  return <ProgramsHomepage preloaded={preloaded} />;
}
