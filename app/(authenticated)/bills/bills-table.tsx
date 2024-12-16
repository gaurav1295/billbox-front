'use client'

import { useState, useEffect } from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Music2, Car, Fuel } from 'lucide-react'

// This would typically come from your API
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const fetchData = (useUploadDate: boolean) => [
  {
    id: '1',
    name: 'Spotify Subscription',
    billDate: '01 Dec, 2023',
    uploadDate: '06 Dec, 2023',
    uploadType: 'PDF Upload',
    billNo: '#12548796',
    category: 'Tax Saving',
    subCategory: 'Books & Periodicals',
    amount: -2500,
    icon: 'spotify',
  },
  {
    id: '2',
    name: 'Fuel Bill',
    billDate: '03 Dec, 2023',
    uploadDate: '05 Dec, 2023',
    uploadType: 'Image Upload',
    billNo: '#INVS003548796',
    category: 'Tax Saving',
    subCategory: 'Fuel & Car Maintainance',
    amount: -4500,
    icon: 'fuel',
  },
  {
    id: '3',
    name: 'Ola Cab to BLR Airport',
    billDate: '28 Nov, 2023',
    uploadDate: '03 Dec, 2023',
    uploadType: 'PDF Whatsapp',
    billNo: '#INVS003548796',
    category: 'Reimburse',
    subCategory: 'Business Travel',
    amount: -1500,
    icon: 'travel',
  },
]

const iconMap = {
  spotify: Music2,
  fuel: Fuel,
  travel: Car,
}

interface BillsTableProps {
  searchQuery: string
  useUploadDate: boolean
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function BillsTable({ searchQuery, useUploadDate }: BillsTableProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any[]>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  useEffect(() => {
    setData(fetchData(useUploadDate))
  }, [useUploadDate])

  const columns: ColumnDef<typeof data[0]>[] = [
    {
      accessorKey: 'name',
      header: 'Bill Name',
      cell: ({ row }) => {
        const Icon = iconMap[row.original.icon as keyof typeof iconMap]
        return (
          <div className="flex items-center gap-3">
            <div className={`rounded-full p-2 ${
              row.original.icon === 'spotify' ? 'bg-cyan-100' :
              row.original.icon === 'fuel' ? 'bg-pink-100' :
              'bg-blue-100'
            }`}>
              <Icon className="h-4 w-4 text-gray-600" />
            </div>
            <div>
              <div className="font-medium">{row.original.name}</div>
              <div className="text-sm text-gray-500">
                {useUploadDate ? row.original.uploadDate : row.original.billDate}
              </div>
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: 'uploadType',
      header: 'Upload Details',
      cell: ({ row }) => (
        <div className="text-sm text-gray-500">{row.original.uploadType}</div>
      ),
    },
    {
      accessorKey: 'billNo',
      header: 'Bill No.',
      cell: ({ row }) => (
        <div className="text-sm text-gray-500">{row.original.billNo}</div>
      ),
    },
    {
      accessorKey: 'category',
      header: 'Category',
      cell: ({ row }) => (
        <div>
          <div className="font-medium text-gray-900">{row.original.category}</div>
          <div className="text-sm text-gray-500">{row.original.subCategory}</div>
        </div>
      ),
    },
    {
      accessorKey: 'amount',
      header: 'Bill Amount',
      cell: ({ row }) => (
        <div className="text-right font-medium text-red-500">
          -Rs. {Math.abs(row.original.amount).toLocaleString()}
        </div>
      ),
    },
    {
      id: 'actions',
      header: 'Receipt',
      cell: () => (
        <div className="text-right">
          <Button variant="outline" size="sm" className="h-8 rounded-full px-4 text-blue-600">
            View
          </Button>
        </div>
      ),
    },
  ]

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="space-y-4">
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">Recent Bills</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant={!columnFilters.length ? 'default' : 'outline'}
              className="rounded-full px-4 py-2 text-sm font-medium"
              onClick={() => table.resetColumnFilters()}
            >
              All Bills
            </Button>
            <Button
              variant="outline"
              className="rounded-full px-4 py-2 text-sm font-medium"
              onClick={() => table.getColumn('category')?.setFilterValue('Reimburse')}
            >
              Reimburse Expenses
            </Button>
            <Button
              variant="outline"
              className="rounded-full px-4 py-2 text-sm font-medium"
              onClick={() => table.getColumn('category')?.setFilterValue('Tax Saving')}
            >
              Tax Saving Expenses
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-full px-4 py-2 text-sm font-medium">Filter</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuCheckboxItem
                  checked={table.getColumn('category')?.getFilterValue() === 'Tax Saving'}
                  onCheckedChange={() =>
                    table.getColumn('category')?.setFilterValue('Tax Saving')
                  }
                >
                  Tax Saving
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={table.getColumn('category')?.getFilterValue() === 'Reimburse'}
                  onCheckedChange={() =>
                    table.getColumn('category')?.setFilterValue('Reimburse')
                  }
                >
                  Reimburse
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-full px-4 py-2 text-sm font-medium">Sort By</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuCheckboxItem
                  checked={sorting.some((sort) => sort.id === 'amount')}
                  onCheckedChange={() =>
                    setSorting([{ id: 'amount', desc: true }])
                  }
                >
                  Amount
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={sorting.some((sort) => sort.id === 'uploadDate')}
                  onCheckedChange={() =>
                    setSorting([{ id: 'uploadDate', desc: true }])
                  }
                >
                  Date
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">Upload New Bill</Button>
          </div>
        </div>
        <div className="mt-4">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="text-gray-500">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} className="border-b last:border-b-0">
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, table.getFilteredRowModel().rows.length)} of {table.getFilteredRowModel().rows.length} results
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              className="h-8 w-8 rounded-full p-0"
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="h-8 w-8 rounded-full p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="h-8 w-8 rounded-full p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              className="h-8 w-8 rounded-full p-0"
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

