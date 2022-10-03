/**
 * A storage for the usage per user
 *
 * Imagine this could be a key-value store
 */
const usagePerUser: { [userId: string]: number } = {};

/**
 * Service for calling a "usage API"
 *
 * Imagine this could be a REST API
 */
const createUsageService = () => ({
  increment: (userId: string) => {
    if (usagePerUser[userId] === undefined) {
      usagePerUser[userId] = 0;
    }

    usagePerUser[userId] += 1;
  },
});

export type UsageService = ReturnType<typeof createUsageService>;

export default createUsageService;
