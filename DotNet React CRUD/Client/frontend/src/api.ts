export type Person = {
  id: number
  name: string
  email: string
  phoneNumber: string | null
}

export type PersonInput = {
  name: string
  email: string
  phoneNumber: string | null
}

type ProblemDetails = {
  title?: string
  detail?: string
  errors?: Record<string, string[]>
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers)
  headers.set('Accept', 'application/json')
  if (init?.body) headers.set('Content-Type', 'application/json')

  const response = await fetch(path, { ...init, headers })
  if (!response.ok) {
    let problem: ProblemDetails | undefined
    try {
      problem = (await response.json()) as ProblemDetails
    } catch (error) {
      if (!(error instanceof SyntaxError)) throw error
    }

    const validationMessage = problem?.errors
      ? Object.values(problem.errors).flat().join(' ')
      : ''
    throw new Error(
      validationMessage ||
        problem?.detail ||
        problem?.title ||
        `Request failed with status ${response.status}.`,
    )
  }

  if (response.status === 204) return undefined as T
  return (await response.json()) as T
}

export function getPeople(signal?: AbortSignal) {
  return request<Person[]>('/api/person', { signal })
}

export function createPerson(input: PersonInput) {
  return request<Person>('/api/person', {
    method: 'POST',
    body: JSON.stringify(input),
  })
}

export function updatePerson(id: number, input: PersonInput) {
  return request<Person>(`/api/person/${id}`, {
    method: 'PUT',
    body: JSON.stringify(input),
  })
}

export function deletePerson(id: number) {
  return request<void>(`/api/person/${id}`, { method: 'DELETE' })
}
