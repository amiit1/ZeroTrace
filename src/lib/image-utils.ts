// This function must run on the client-side

export async function imageToDataURI(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
    }
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Error converting image to Data URI:", error);
    // Fallback to a default tiny transparent gif if fetch fails, or rethrow.
    // This helps prevent app crashes if a placeholder URL is broken.
    // For a real app, more robust error handling or specific placeholder dataURIs would be better.
    return "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
  }
}
