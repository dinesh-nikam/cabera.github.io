import { prisma } from "@/lib/prisma";

export interface SavedLocation {
  id: string;
  label: string;
  address: string;
  lat: number;
  lng: number;
  type: "HOME" | "WORK" | "FAVORITE" | "AIRPORT" | "OTHER";
}

export class SavedLocationService {
  // Get saved locations for user
  async getLocations(userId: string): Promise<SavedLocation[]> {
    // In production, this would fetch from a SavedLocation table
    // For now, we'll use a Setting-based approach
    const setting = await prisma.setting.findUnique({
      where: { key: `saved_locations_${userId}` },
    });

    return setting ? JSON.parse(setting.value) : [];
  }

  // Save a location
  async saveLocation(
    userId: string,
    location: Omit<SavedLocation, "id">,
  ): Promise<SavedLocation> {
    const existing = await this.getLocations(userId);
    const newLocation: SavedLocation = {
      ...location,
      id: `loc_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    };

    const updated = [...existing, newLocation];

    await prisma.setting.upsert({
      where: { key: `saved_locations_${userId}` },
      create: {
        key: `saved_locations_${userId}`,
        value: JSON.stringify(updated),
        isPublic: false,
      },
      update: {
        value: JSON.stringify(updated),
      },
    });

    return newLocation;
  }

  // Delete a location
  async deleteLocation(userId: string, locationId: string): Promise<void> {
    const existing = await this.getLocations(userId);
    const filtered = existing.filter((loc) => loc.id !== locationId);

    await prisma.setting.upsert({
      where: { key: `saved_locations_${userId}` },
      create: {
        key: `saved_locations_${userId}`,
        value: JSON.stringify(filtered),
        isPublic: false,
      },
      update: {
        value: JSON.stringify(filtered),
      },
    });
  }
}

export default new SavedLocationService();
