import {useEffect, useMemo, useState} from 'react'
import Cookies from 'js-cookie'

import Navbar from '../../components/Navbar/Navbar'
import Overview from '../../components/Overview/Overview'
import ServiceSummary from '../../components/ServiceSummary/ServiceSummary'
import ShareReferral from '../../components/ShareReferral/ShareReferral'
import ReferralTable from '../../components/ReferralTable/ReferralTable'
import Pagination from '../../components/Pagination/Pagination'
import Loader from '../../components/Loader/Loader'

import './Dashboard.css'

const dashboardApi =
  'https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/referrals'

const rowsPerPage = 10

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [sortOrder, setSortOrder] = useState('latest')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const getDashboard = async () => {
      setLoading(true)
      setError('')

      try {
        const jwtToken = Cookies.get('jwt_token')

        const response = await fetch(dashboardApi, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        })

        const data = await response.json()

        if (response.ok) {
          setDashboardData(data.data)
        } else {
          setError(data.message || 'Unable to load dashboard')
        }
      } catch (e) {
        setError('Something went wrong')
      }

      setLoading(false)
    }

    getDashboard()
  }, [])

  const referrals = dashboardData?.referrals || []

  const filteredReferrals = useMemo(() => {
    const value = searchInput.toLowerCase()

    let list = referrals.filter(item => {
      const name =
        item.name ||
        item.customer_name ||
        ''

      return name.toLowerCase().includes(value)
    })

    list.sort((a, b) => {
      const first = new Date(a.date || a.created_at)
      const second = new Date(b.date || b.created_at)

      if (sortOrder === 'oldest') {
        return first - second
      }

      return second - first
    })

    return list
  }, [referrals, searchInput, sortOrder])

  const totalEntries = filteredReferrals.length

  const paginatedReferrals = filteredReferrals.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  )

  useEffect(() => {
    setCurrentPage(1)
  }, [searchInput])

  if (loading) {
    return <Loader />
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <h2>{error}</h2>
      </div>
    )
  }

  const metrics = dashboardData?.metrics || []

  const serviceSummary = dashboardData?.serviceSummary
    ? [dashboardData.serviceSummary]
    : []

  const referral = dashboardData?.referral || {}
    return (
    <>
      <Navbar />

      <main className="dashboard-page">
        <div className="dashboard-header">
          <h1>Referral Dashboard</h1>
          <p>
            Track your referrals, earnings, and partner activity in one place.
          </p>
        </div>

        <Overview metrics={metrics} />

        <ServiceSummary services={serviceSummary} />

        <ShareReferral
          referralLink={referral.referral_link}
          referralCode={referral.referral_code}
        />

        <section className="dashboard-controls">
          <input
            type="search"
            placeholder="Search by customer name"
            value={searchInput}
            onChange={event => setSearchInput(event.target.value)}
          />

          <select
            value={sortOrder}
            onChange={event => setSortOrder(event.target.value)}
          >
            <option value="latest">Latest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </section>

        <ReferralTable referrals={paginatedReferrals} />

        <Pagination
          currentPage={currentPage}
          totalEntries={totalEntries}
          rowsPerPage={rowsPerPage}
          onPageChange={setCurrentPage}
        />
      </main>
    </>
  )
}

export default Dashboard