import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { ChildPage } from './program';
export default async function ServerComponent({ params }: { params: { id } }) {
  const preloaded = await preloadQuery(api.programs.getSpecificProgram, {programId: params.id});
  return <ChildPage preloaded={preloaded} />;
}