const PROFILE_KEY = "sortifyed_profile";

export function decodeToken(token) {
  if (!token) {
    return {};
  }

  try {
    const payload = token.split(".")[1];
    const normalizedPayload = payload.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = JSON.parse(window.atob(normalizedPayload));

    return decoded;
  } catch (error) {
    console.error("Unable to decode token:", error);
    return {};
  }
}

export function getStoredProfile() {
  try {
    return JSON.parse(localStorage.getItem(PROFILE_KEY)) ?? {};
  } catch (error) {
    console.error("Unable to read profile:", error);
    return {};
  }
}

export function saveStoredProfile(profile) {
  const currentProfile = getStoredProfile();
  const nextProfile = {
    ...currentProfile,
    ...profile,
  };

  localStorage.setItem(PROFILE_KEY, JSON.stringify(nextProfile));
  window.dispatchEvent(new Event("profile:update"));
  return nextProfile;
}

export function clearStoredProfile() {
  localStorage.removeItem(PROFILE_KEY);
  window.dispatchEvent(new Event("profile:update"));
}

export function getCurrentProfile() {
  const storedProfile = getStoredProfile();
  const tokenProfile = decodeToken(localStorage.getItem("access"));
  const username =
    storedProfile.username ??
    tokenProfile.username ??
    tokenProfile.user_name ??
    tokenProfile.sub ??
    "User";

  return {
    username,
    fullName: storedProfile.fullName ?? username,
    email: storedProfile.email ?? tokenProfile.email ?? "",
    roleTitle: storedProfile.roleTitle ?? "Job seeker",
    location: storedProfile.location ?? "",
    skills: storedProfile.skills ?? "",
  };
}

export function getProfileInitials(profile) {
  const label = profile.fullName || profile.username || "User";
  const initials = label
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

  return initials.toUpperCase() || "U";
}
