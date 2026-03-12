let projectsRoutePromise;

export const prefetchProjectsRoute = () => {
  if (!projectsRoutePromise) {
    projectsRoutePromise = import('../pages/Projects').catch((error) => {
      projectsRoutePromise = undefined;
      throw error;
    });
  }

  return projectsRoutePromise;
};
