export interface School {
  id: string
  name: string
  address: string
}

export interface SchoolClass {
  id: string
  schoolId: string
  name: string
  type: 'morning' | 'afternoon' | 'night'
}