import Landing from '@/components/Landing';
import { userSession } from '@/firebase/serverUserSessionUtils';

export default async function Page() {
  const userData = await userSession();

  return <Landing user={userData} />;
}
