// scheduling.js

/**
 * Schedule recipe steps based on prerequisites and durations.
 * @param {Array} steps - Array of step objects with id, title, duration, and prerequisites.
 * @returns {Object} - The computed schedule, ordered step IDs, critical path, and total duration.
 */
function scheduleRecipeSteps(steps) {
  // Validate input and build graph
  const stepMap = new Map();
  const inDegree = new Map();
  const graph = new Map();

  steps.forEach(step => {
    stepMap.set(step.id, step);
    inDegree.set(step.id, 0);
    graph.set(step.id, []);
  });

  steps.forEach(step => {
    step.prerequisites.forEach(prereq => {
      if (!stepMap.has(prereq)) {
        throw new Error(`Missing prerequisite ID: ${prereq}`);
      }
      graph.get(prereq).push(step.id);
      inDegree.set(step.id, inDegree.get(step.id) + 1);
    });
  });

  // Detect circular dependencies using Kahn's algorithm
  const topologicalOrder = [];
  const queue = [];
  inDegree.forEach((degree, id) => {
    if (degree === 0) queue.push(id);
  });

  while (queue.length > 0) {
    const current = queue.shift();
    topologicalOrder.push(current);

    graph.get(current).forEach(neighbor => {
      inDegree.set(neighbor, inDegree.get(neighbor) - 1);
      if (inDegree.get(neighbor) === 0) queue.push(neighbor);
    });
  }

  if (topologicalOrder.length !== steps.length) {
    throw new Error("Circular dependency detected");
  }

  // Compute schedule
  const schedule = {};
  let totalPlannedDuration = 0;

  topologicalOrder.forEach(id => {
    const step = stepMap.get(id);
    const earliestStart = step.prerequisites.reduce(
      (max, prereq) => Math.max(max, schedule[prereq].plannedEnd),
      0
    );
    const plannedStart = earliestStart;
    const plannedEnd = plannedStart + step.duration;

    schedule[id] = { ...step, plannedStart, plannedEnd };
    totalPlannedDuration = Math.max(totalPlannedDuration, plannedEnd);
  });

  // Compute critical path
  const criticalPath = [];
  let currentStep = topologicalOrder[topologicalOrder.length - 1];
  let latestEnd = schedule[currentStep].plannedEnd;

  while (currentStep) {
    criticalPath.unshift(currentStep);
    const prereqs = stepMap.get(currentStep).prerequisites;
    const prereqStep = stepMap.get(currentStep);
    currentStep = prereqs.find(
      prereq => schedule[prereq].plannedEnd === latestEnd - prereqStep.duration
    );
    latestEnd -= stepMap.get(criticalPath[0]).duration;
  }

  // Output structure
  return topologicalOrder.map(id => schedule[id]);
}

module.exports = { scheduleRecipeSteps };
