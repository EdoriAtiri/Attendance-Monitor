import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { getMembers, reset } from '../features/Members/memberSlice'
import MemberCard from '../components/memberCard'
import NewEvent from '../components/NewEvent'
import Loading from '../components/Loading'
import sortByProperty from '../lib/sortByProperty'

const SORT_VALUES = [
  {
    display: 'date created',
    value: 'createdAt',
  },
  {
    display: 'event date',
    value: 'eventDate',
  },
  {
    display: 'name',
    value: 'eventName',
  },
  {
    display: 'finished',
    value: 'finished',
  },
  {
    display: 'pending',
    value: 'pending',
  },
]

function Members() {
  const [defaultMembers, setDefaultMembers] = useState([])
  const [isNewMember, setIsNewMember] = useState(false)
  const { members, isSuccess, isLoading } = useSelector(
    (state) => state.members
  )
  const [memberStats, setMemberStats] = useState({
    total: '',
    adults: '',
    teenagersAndChildren: '',
  })

  const { total, adults, teenagersAndChildren } = memberStats

  const [searchParams, setSearchParams] = useSearchParams({
    q: '',
    sortBy: '',
  })
  const q = searchParams.get('q')
  // Search Params
  const sortBy = searchParams.get('sortBy') || 'date created'
  // useSearchParams stores values as string, so for booleans and numbers check that you have the val you want

  const dispatch = useDispatch()

  // Triggers the reset reducer function in eventSlice and sets the state back to the initialState object, effectively clearing any data and resetting the flags like isLoading, isSuccess, isError, and message to their initial values.
  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset())
      }
    }
  }, [dispatch, isSuccess])
  // Gets members
  useEffect(() => {
    dispatch(getMembers())
  }, [dispatch])

  // update default events
  useEffect(() => {
    if (members) {
      setDefaultMembers(members)
    }
  }, [members])

  // Creates stats when getMembers is successful
  useEffect(() => {
    if (Array.isArray(members)) {
      setMemberStats({
        total: members.length || 0,
        adults:
          members.filter((members) => members.category === 'adult').length || 0,
        teenagersAndChildren:
          members.filter(
            (members) =>
              members.category === 'teenager' || members.category === 'child'
          ).length || 0,
      })
    }
  }, [members])

  /*
  // filter by query
  useEffect(() => {
    const filteredEvents =
      myEvents?.filter((item) => {
        // Check if the item's name includes the provided name (case-insensitive)
        const nameMatch = item?.eventName
          ?.toLowerCase()
          .includes(q?.toLowerCase())
        return nameMatch
      }) ?? []

    SORT_VALUES.forEach((val) => {
      if (sortBy === val.display) {
        sortEvents(filteredEvents, val.value)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, myEvents, sortBy])

  const sortEvents = (arr, value) => {
    // For sort to work defaultMembers must be an array
    let sortedEvents = [...arr]
    const currentDate = new Date()

    const pendingEvents = sortedEvents.filter(
      (event) => new Date(event.eventDate) > currentDate
    )
    const finishedEvents = sortedEvents.filter(
      (event) => new Date(event.eventDate) < currentDate
    )

    if (sortBy !== 'finished' || sortBy !== 'pending') {
      sortedEvents.sort(sortByProperty(value))
      if (sortBy === 'event date') sortedEvents.reverse()
      // SortbyProperty returns inactive Events first, the reverse method flips that
    }

    // Sort by pending or finished
    if (sortBy === 'finished') {
      sortedEvents = [...finishedEvents, ...pendingEvents]
    }
    if (sortBy === 'pending')
      sortedEvents = [...pendingEvents, ...finishedEvents]

    setDefaultMembers(sortedEvents)
  }

  // Sort registrars by SORT_VALUE value if display name matches sortBy
  useEffect(() => {
    SORT_VALUES.forEach((val) => {
      if (sortBy === val.display) {
        sortEvents(defaultMembers, val.value)
      }
    })
    console.log(sortBy)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy])
  */

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className=" mx-6 mt-10 mb-6">
      {isNewMember && <NewEvent closeForm={() => setIsNewMember(false)} />}
      <header className="items-center justify-between flex text-xl font-semibold">
        <h1>Members</h1>
        <button
          onClick={() => setIsNewMember(true)}
          className="text-lg border border-gray-700 p-1 rounded-md"
        >
          Create New Member
        </button>
      </header>{' '}
      {/* Admin member Stats */}
      <div className="flex gap-4 mb-4 mt-8">
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Total Members</div>
            <div className="stat-value text-2xl">{total}</div>
          </div>

          <div className="stat">
            <div className="stat-title">Adults</div>
            <div className="stat-value text-2xl">{adults}</div>
          </div>

          <div className="stat">
            <div className="stat-title">Teens and Children</div>
            <div className="stat-value text-2xl">{teenagersAndChildren}</div>
          </div>
        </div>
      </div>
      {/* Sorting and Filtering */}
      <div className="flex flex-col lg:flex-row gap-3 lg:gap-6 mt-6 mb-1">
        <div className=" flex gap-2 items-center">
          <label className="text-sm" htmlFor="q">
            Search
          </label>
          <input
            className="input input-bordered w-full max-w-xs h-8"
            type="text"
            id="q"
            value={q}
            onChange={(e) =>
              setSearchParams(
                (prev) => {
                  prev.set('q', e.target.value)

                  return prev
                },
                { replace: true }
              )
            }
          />
        </div>
        {/* sorting */}
        <div className="dropdown dropdown-end text-sm gap-2 flex items-center h-full">
          <label htmlFor="sort" className="">
            Sort By:
          </label>

          <select
            className="capitalize"
            defaultValue={sortBy}
            name="sort"
            id="sort"
            onChange={(e) =>
              setSearchParams(
                (prev) => {
                  prev.set('sortBy', e.target.value)

                  return prev
                },
                { replace: true }
              )
            }
          >
            {SORT_VALUES.map((val, index) => (
              <option className="capitalize" key={index} value={val.display}>
                {val.display}
              </option>
            ))}{' '}
          </select>
        </div>
      </div>
      {/* Members */}
      <section className="w-full flex flex-col mt-8 gap-8">
        {Array.isArray(defaultMembers) ? (
          defaultMembers.map((member) => (
            <MemberCard
              name={member.fullName}
              gender={member.gender}
              category={member.category}
              membershipStatus={member.membershipStatus}
              key={member._id}
              id={member._id}
            />
          ))
        ) : (
          <p>Error loading events...</p>
        )}
      </section>
    </div>
  )
}

export default Members
