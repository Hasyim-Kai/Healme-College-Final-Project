import { NextPage } from "next"
import { useRouter } from "next/router"
import CircleBgAnimation from "../../../presentation/components/global/CircleBgAnimation"
import DefaultLayout from "../../../presentation/layout/DefaultLayout"
import UserNavbar from '../../../presentation/components/features/dashboard/UserNavbar'
import CircleDetail from "../../../presentation/components/features/dashboard/circle/CircleDetail"

const CrcleDetailPage: NextPage = () => {
  const router = useRouter()
  const { id = `1` } = router.query

  return <DefaultLayout pageTitle='Circle Detail' additionalStyle='relative'>
    <UserNavbar />
    <CircleDetail />
    <CircleBgAnimation />
  </DefaultLayout>
}

export default CrcleDetailPage