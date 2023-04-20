import { BarCodeScanner } from "expo-barcode-scanner";
import { useEffect, useState } from "react";

export function useCameraPermissions() {
  const [permission, setPermission] = useState(true);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const { status, granted } =
        await BarCodeScanner.requestPermissionsAsync();
      console.log(`Status: ${status}, Granted: ${granted}`);

      if (status === 'granted') {
        console.log('Access granted');
        setPermission(true);
      } else {
        setPermission(false);
      }
    } catch (error) {
      console.error(error);
      setPermission(false);
    } finally {
      setLoading(false);
    }
  };

  return { permission, loading };
}