import React, { useContext, useEffect, useState } from 'react'
import CustomNavbar from '../../../components/reusable/Navbar'
import { UserContext } from '../../../contexts/users/UserContext'
import StoreCard from '../../../components/users/StoreCard';
import { Badge, Button, Checkbox, Drawer, Label, Select, Spinner, TextInput, Tooltip } from 'flowbite-react';
import { allStores } from '../../../services/users/UserCommonServices';
import { HiOutlineFilter } from 'react-icons/hi';
import { TagsInput } from 'react-tag-input-component';
import { CommonContext } from '../../../contexts/CommonContext';
import { toast } from 'react-toastify';

export default function UserHomePage() {

  const { getUserById } = useContext(UserContext);
  const [storeDataLoading, setStoreDataLoading] = useState(false);
  const [store, setStore] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    keywords: '',
    state: 'Choose state',
    district: 'Choose district',
    specification: '',
    rentPerMonth: [],
    squareFeet: [],
    totalFiltersApplied: 0
  });
  const [districts, setDistricts] = useState([]);

  const { getAllStates, states, getAllDistricts } = useContext(CommonContext);


  const handleChange = (event) => {
    setFilters(prev => ({ ...prev, specification: event.target.value }));
  };

  const handleClose = () => setIsOpen(false);

  const getAllStores = async () => {
    setStoreDataLoading(true)
    try {
      const response = await allStores();
      if (response) {
        setStore(response.data.rentalStores);
        setStoreDataLoading(false);
      }
    }
    catch (err) {
      setStoreDataLoading(false);
      toast.error(err?.response?.data?.data?.error || err?.response?.data?.message || err.message);
    }
  }

  useEffect(() => {
    if (sessionStorage.getItem('token') && sessionStorage.getItem('user')) {
      getUserById()
    }
    getAllStates();
    getAllStores()
  }, [])

  const handleStateOnChange = async (e) => {
    setFilters(prev => ({ ...prev, state: e.target.value }));
    try {
      const districts = await getAllDistricts(e.target.value === 'Tamil Nadu' ? 3 : e.target.value === 'Andhra Pradesh' ? 1 : e.target.value === 'Kerala' ? 2 : 4);
      if (districts) {
        setDistricts(districts.district);
      }
    }
    catch (error) {
      toast.error(error?.response?.data?.data?.error || error.message)
    }
  }

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    let updatedRentPerMonth = [...filters.rentPerMonth];
    let updatedSquareFeet = [...filters.squareFeet];

    switch (id) {
      case 'rent-0-10000':
        updatedRentPerMonth = checked
          ? [...updatedRentPerMonth, [0, 10000]]
          : updatedRentPerMonth.filter(range => range[0] !== 0 || range[1] !== 10000);
        break;
      case 'rent-10000-20000':
        updatedRentPerMonth = checked
          ? [...updatedRentPerMonth, [10000, 20000]]
          : updatedRentPerMonth.filter(range => range[0] !== 10000 || range[1] !== 20000);
        break;
      case 'rent-20000-50000':
        updatedRentPerMonth = checked
          ? [...updatedRentPerMonth, [20000, 50000]]
          : updatedRentPerMonth.filter(range => range[0] !== 20000 || range[1] !== 50000);
        break;
      case 'rent-50000-70000':
        updatedRentPerMonth = checked
          ? [...updatedRentPerMonth, [50000, 70000]]
          : updatedRentPerMonth.filter(range => range[0] !== 50000 || range[1] !== 70000);
        break;
      case 'rent-70000-100000':
        updatedRentPerMonth = checked
          ? [...updatedRentPerMonth, [70000, 100000]]
          : updatedRentPerMonth.filter(range => range[0] !== 70000 || range[1] !== 100000);
        break;
      case 'sqft-0-5000':
        updatedSquareFeet = checked
          ? [...updatedSquareFeet, [0, 5000]]
          : updatedSquareFeet.filter(range => range[0] !== 0 || range[1] !== 5000);
        break;
      case 'sqft-5000-10000':
        updatedSquareFeet = checked
          ? [...updatedSquareFeet, [5000, 10000]]
          : updatedSquareFeet.filter(range => range[0] !== 5000 || range[1] !== 10000);
        break;
      case 'sqft-10000-20000':
        updatedSquareFeet = checked
          ? [...updatedSquareFeet, [10000, 20000]]
          : updatedSquareFeet.filter(range => range[0] !== 10000 || range[1] !== 20000);
        break;
      default:
        break;
    }

    setFilters(prev => ({
      ...prev,
      rentPerMonth: updatedRentPerMonth,
      squareFeet: updatedSquareFeet
    }));
  };


  const handleApplyFilters = async () => {
    let count = 0;

    if (filters.keywords) count++;
    if (filters.state !== 'Choose state') count++;
    if (filters.district !== 'Choose district') count++;
    if (filters.specification) count++;
    if (filters.rentPerMonth.length > 0) count++;
    if (filters.squareFeet.length > 0) count++;
    setFilters(prev => ({ ...prev, totalFiltersApplied: count }));
    setIsOpen(false);
    try {
      const response = await allStores(filters);
      if (response) {
        setStore(response.data.rentalStores);
      }
    }
    catch (err) {
      toast.error(err?.response?.data?.data?.error || err?.response?.data?.message || err.message);
    }

  }


  const handleClearFilter = async () => {
    setFilters({
      keywords: [],
      state: 'Choose state',
      district: 'Choose district',
      specification: '',
      rentPerMonth: [],
      squareFeet: [],
      totalFiltersApplied: 0
    })
    setIsOpen(false)
    try {
      const response = await allStores();
      if (response) {
        setStore(response.data.rentalStores);
      }
    }
    catch (err) {
      toast.error(err?.response?.data?.data?.error || err?.response?.data?.message || err.message);
    }
  }

  return (
    <>
      <CustomNavbar />
      <div className='max-w-[1000px] mx-auto mt-20'>
        <div className='flex justify-between items-center'>
          <h1 className='font-[900] text-[23px]'>Stores ({store?.length})</h1>
          <Tooltip content='Apply Filters'>
            <div className='relative w-10'>
              <HiOutlineFilter onClick={() => setIsOpen(true)} className='w-6 h-6 cursor-pointer' />
              <Badge color={'success'} className='rounded-full font-bold absolute right-0 top-[-10px]'>{filters.totalFiltersApplied}</Badge>
            </div>

          </Tooltip>
        </div>
        <div className='flex justify-center flex-wrap'>
          {
            storeDataLoading ? (
              <div className='flex justify-center items-center'>
                <Spinner />
              </div>
            ) : (
              store?.length < 1 ? (
                <div className='flex justify-center mt-10 items-center'>
                  <h1 className='font-bold'>No stores found</h1>
                </div>
              ) : (
                <div className='w-full flex justify-center gap-10 my-10 flex-wrap items-center'>
                  {
                    store?.map((store, idx) => (
                      <StoreCard
                        key={idx}
                        storeDetails={store}
                        isListPage={true}
                      // setOpenModal={setOpenModal}
                      // setTableRow={setTableRow}
                      // tableRow={tableRow}
                      />
                    ))
                  }
                </div>
              )
            )
          }
        </div>
      </div>
      <Drawer open={isOpen} onClose={handleClose} className='w-90 overflow-auto'>
        <Drawer.Header title="Filters" titleIcon={() => <HiOutlineFilter className='mr-2' />} />
        <Drawer.Items>
          <div className="p-4">
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
              Supercharge your search by using the filter options below.
            </p>
            <div className="flex flex-col gap-3">
              <div>
                <Label htmlFor="keywords" className="mb-2 block">
                  Keywords
                </Label>
                <TagsInput
                  value={filters.keywords}
                  onChange={(item) => setFilters(prev => ({ ...prev, keywords: item }))}
                  name="keyword"
                  placeHolder="Enter the keywords"
                  classNames={'w-[10x]'}
                />
              </div>
              {/* <div>
                <Label htmlFor="location" className="mb-2 block">
                  Location
                </Label>
                <TextInput
                  id="location"
                  name="location"
                  placeholder="Enter location"
                  value={filters.location}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div> */}
              <div>
                <Label htmlFor="state" value="State" />
                <Select
                  name='state'
                  id="state"
                  className='w-full'
                  value={filters.state}
                  onChange={handleStateOnChange}
                >
                  <option selected disabled>Choose state</option>
                  {
                    states?.map((state, idx) => <option key={idx}>{state?.name}</option>)
                  }
                </Select>
              </div>
              <div>
                <Label htmlFor="district" value="District" />
                <Select
                  name='district'
                  id="district"
                  className='w-full'
                  value={filters.district}
                  onChange={(e) => setFilters(prev => ({ ...prev, district: e.target.value }))}
                >
                  <option selected disabled>Choose district</option>
                  {
                    districts?.map((district, idx) => <option key={idx}>{district?.districtName}</option>)
                  }
                </Select>
              </div>
              <div className='flex flex-col w-full mb-2'>
                <label htmlFor='checkbox' className='font-medium text-sm'>Specification</label>
                <ul className="flex w-full gap-2 mt-1" id='checkbox'>
                  <li>
                    <input
                      type="radio"
                      id="unfurnished-option"
                      value="unfurnished"
                      className="hidden peer"
                      checked={filters.specification === 'unfurnished'}
                      onChange={handleChange}
                      required
                    />
                    <label
                      htmlFor="unfurnished-option"
                      className="inline-flex items-center justify-between w-full px-2 py-1 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                      <div className="block">
                        <div className="w-full text-sm">Un Furnished</div>
                      </div>
                    </label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      id="furnished-option"
                      value="furnished"
                      className="hidden peer"
                      checked={filters.specification === 'furnished'}
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="furnished-option"
                      className="inline-flex items-center justify-between w-full px-2 py-1 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                      <div className="block">
                        <div className="w-full text-sm">Furnished</div>
                      </div>
                    </label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      id="semi-furnished-option"
                      value="semi-furnished"
                      className="hidden peer"
                      checked={filters.specification === 'semi-furnished'}
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="semi-furnished-option"
                      className="inline-flex items-center justify-between w-full px-2 py-1 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                      <div className="block">
                        <div className="w-full text-sm">Semi Furnished</div>
                      </div>
                    </label>
                  </li>
                </ul>
              </div>
              <div className='mb-2'>
                <Label htmlFor="location" className="mb-2 block">
                  Rent/Month
                </Label>
                <div className="flex flex-col gap-2">
                  <div className='flex items-center gap-2'>
                    <Checkbox id="rent-0-10000" onChange={handleCheckboxChange}  checked={filters.rentPerMonth.some(range => range[0] === 0 && range[1] === 10000)} />
                    <Label htmlFor="rent-0-10000" className="flex">
                      ₹ 0 - ₹ 10,000
                    </Label>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Checkbox id="rent-10000-20000" onChange={handleCheckboxChange}  checked={filters.rentPerMonth.some(range => range[0] === 10000 && range[1] === 20000)} />
                    <Label htmlFor="rent-10000-20000" className="flex">
                      ₹ 10,000 - ₹ 20,000
                    </Label>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Checkbox id="rent-20000-50000" onChange={handleCheckboxChange}  checked={filters.rentPerMonth.some(range => range[0] === 20000 && range[1] === 50000)} />
                    <Label htmlFor="rent-20000-50000" className="flex">
                      ₹ 20,000 - ₹ 50,000
                    </Label>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Checkbox id="rent-50000-70000" onChange={handleCheckboxChange}  checked={filters.rentPerMonth.some(range => range[0] === 50000 && range[1] === 70000)} />
                    <Label htmlFor="rent-50000-70000" className="flex">
                      ₹ 50,000 - ₹ 70,000
                    </Label>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Checkbox id="rent-70000-100000" onChange={handleCheckboxChange}  checked={filters.rentPerMonth.some(range => range[0] === 70000 && range[1] === 100000)} />
                    <Label htmlFor="rent-70000-100000" className="flex">
                      ₹ 70,000 - ₹ 1,00,000
                    </Label>
                  </div>
                </div>
              </div>

              <div className='mb-2'>
                <Label htmlFor="location" className="mb-2 block">
                  Square Feet
                </Label>
                <div className="flex flex-col gap-2">
                  <div className='flex items-center gap-2'> 
                    <Checkbox id="sqft-0-5000" onChange={handleCheckboxChange}  checked={filters.squareFeet.some(range => range[0] === 0 && range[1] === 5000)} />
                    <Label htmlFor="sqft-0-5000" className="flex">
                      0 sq feet - 5,000 sq feet
                    </Label>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Checkbox id="sqft-5000-10000" onChange={handleCheckboxChange} checked={filters.squareFeet.some(range => range[0] === 5000 && range[1] === 10000)} />
                    <Label htmlFor="sqft-5000-10000" className="flex">
                      5,000 sq feet - 10,000 sq feet
                    </Label>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Checkbox id="sqft-10000-20000" onChange={handleCheckboxChange} checked={filters.squareFeet.some(range => range[0] === 10000 && range[1] === 20000)} />
                    <Label htmlFor="sqft-10000-20000" className="flex">
                      10,000 sq feet - 20,000 sq feet
                    </Label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  color={'gray'}
                  onClick={handleClearFilter}
                >
                  Clear Filter
                </Button>
                <Button
                  color={'blue'}
                  onClick={handleApplyFilters}
                >
                  Apply Filters

                </Button>
              </div>
            </div>
          </div>
        </Drawer.Items>
      </Drawer>
    </>
  )
}
