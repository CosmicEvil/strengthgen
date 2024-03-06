import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import  ChildPage from './program';
const ServerComponent = async({ params }: { params: { id } }) => {
  const id = params.id as any;
  const preloadedProgram = await preloadQuery(
    api.programs.getSpecificProgram,
    { programId: id },
    {  },
  );

  return <ChildPage preloadedPrograms={preloadedProgram} />;
}

export default ServerComponent;