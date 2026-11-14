import { useCallback, useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import {
  createPerson,
  deletePerson,
  getPeople,
  updatePerson,
} from './api'
import type { Person, PersonInput } from './api'
import './App.css'

function App() {
  const [people, setPeople] = useState<Person[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingPerson, setEditingPerson] = useState<Person | null>(null)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [formError, setFormError] = useState<string | null>(null)
  const [pageError, setPageError] = useState<string | null>(null)

  const loadPeople = useCallback(async (signal?: AbortSignal) => {
    try {
      const result = await getPeople(signal)
      setPeople(result)
      setPageError(null)
    } catch (error) {
      if (!signal?.aborted) {
        setPageError(
          error instanceof Error ? error.message : 'Unable to load people.',
        )
      }
    } finally {
      if (!signal?.aborted) {
        setLoading(false)
      }
    }
  }, [])

  function retryLoad() {
    setPageError(null)
    setLoading(true)
    void loadPeople()
  }

  useEffect(() => {
    const controller = new AbortController()
    getPeople(controller.signal)
      .then((result) => {
        if (!controller.signal.aborted) {
          setPeople(result)
          setPageError(null)
        }
      })
      .catch((error: unknown) => {
        if (!controller.signal.aborted) {
          setPageError(
            error instanceof Error ? error.message : 'Unable to load people.',
          )
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })
    return () => controller.abort()
  }, [])

  const filteredPeople = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return people

    return people.filter((person) =>
      [person.name, person.email, person.phoneNumber ?? '']
        .join(' ')
        .toLowerCase()
        .includes(query),
    )
  }, [people, search])

  function openCreateForm() {
    setEditingPerson(null)
    setFormError(null)
    setIsFormOpen(true)
  }

  function openEditForm(person: Person) {
    setEditingPerson(person)
    setFormError(null)
    setIsFormOpen(true)
  }

  function closeForm() {
    if (!saving) setIsFormOpen(false)
  }

  async function savePerson(input: PersonInput) {
    setSaving(true)
    setFormError(null)

    try {
      if (editingPerson) {
        const updatedPerson = await updatePerson(editingPerson.id, input)
        setPeople((current) =>
          current.map((person) =>
            person.id === updatedPerson.id ? updatedPerson : person,
          ),
        )
      } else {
        const createdPerson = await createPerson(input)
        setPeople((current) =>
          [...current, createdPerson].sort((left, right) => left.id - right.id),
        )
      }
      setIsFormOpen(false)
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : 'Unable to save this person.',
      )
    } finally {
      setSaving(false)
    }
  }

  async function removePerson(person: Person) {
    const confirmed = window.confirm(`Delete ${person.name}?`)
    if (!confirmed) return

    setDeletingId(person.id)
    setPageError(null)
    try {
      await deletePerson(person.id)
      setPeople((current) => current.filter((item) => item.id !== person.id))
    } catch (error) {
      setPageError(
        error instanceof Error ? error.message : 'Unable to delete this person.',
      )
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="People home">
          <span className="brand-mark" aria-hidden="true">P</span>
          <span className="brand-name">people<span>stack</span></span>
        </a>
        <div className="topbar-meta">
          <span className="status-dot" aria-hidden="true" />
          <span>Workspace</span>
          <span className="topbar-divider" />
          <span className="avatar avatar-small">A</span>
        </div>
      </header>

      <main className="main-content">
        <section className="intro">
          <div className="eyebrow"><span /> YOUR CONTACTS, ORGANIZED</div>
          <div className="intro-row">
            <div>
              <h1>People directory</h1>
              <p className="intro-copy">
                Keep your people and their details all in one place.
              </p>
            </div>
            <button className="button button-primary add-button" onClick={openCreateForm}>
              <span className="plus-icon" aria-hidden="true">+</span>
              Add person
            </button>
          </div>
        </section>

        <section className="summary-grid" aria-label="Directory summary">
          <article className="summary-card">
            <div className="summary-icon people-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M16 20v-1.6a3.4 3.4 0 0 0-3.4-3.4H6.4A3.4 3.4 0 0 0 3 18.4V20m15-5a3.4 3.4 0 0 1 3 3.4V20m-11.5-9a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm7-6.7a3.5 3.5 0 0 1 0 6.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <p className="summary-label">TOTAL PEOPLE</p>
              <p className="summary-value">{people.length}</p>
            </div>
            <span className="summary-caption">in your directory</span>
          </article>
          <article className="summary-card">
            <div className="summary-icon email-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <rect x="3" y="5" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="1.7" />
                <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <p className="summary-label">CONTACT DETAILS</p>
              <p className="summary-value">{people.filter((person) => person.email).length}</p>
            </div>
            <span className="summary-caption">email addresses saved</span>
          </article>
        </section>

        <section className="directory-panel" aria-labelledby="directory-title">
          <div className="panel-heading">
            <div>
              <h2 id="directory-title">All people</h2>
              <p>View and manage your contacts</p>
            </div>
            <label className="search-box">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="1.7" />
                <path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
              <input
                type="search"
                placeholder="Search people..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                aria-label="Search people"
              />
              <kbd>/</kbd>
            </label>
          </div>

          {pageError && (
            <div className="error-banner" role="alert">
              <span>{pageError}</span>
              <button className="text-button" onClick={retryLoad}>
                Try again
              </button>
            </div>
          )}

          <div className="table-wrap">
            <table className="people-table">
              <thead>
                <tr>
                  <th scope="col">PERSON</th>
                  <th scope="col">EMAIL ADDRESS</th>
                  <th scope="col">PHONE NUMBER</th>
                  <th scope="col" className="actions-heading">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={4} className="table-message">Loading people...</td></tr>
                ) : filteredPeople.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="table-message">
                      {people.length === 0 ? (
                        <div className="empty-state">
                          <span className="empty-icon" aria-hidden="true">+</span>
                          <strong>Your directory is ready</strong>
                          <span>Add your first person to get started.</span>
                          <button className="button button-secondary" onClick={openCreateForm}>
                            Add your first person
                          </button>
                        </div>
                      ) : (
                        <div className="empty-state">
                          <strong>No matches found</strong>
                          <span>Try a different name, email, or phone number.</span>
                        </div>
                      )}
                    </td>
                  </tr>
                ) : (
                  filteredPeople.map((person) => (
                    <tr key={person.id}>
                      <td data-label="PERSON">
                        <div className="person-cell">
                          <span className="avatar">{person.name.trim().charAt(0).toUpperCase()}</span>
                          <span className="person-name">{person.name}</span>
                        </div>
                      </td>
                      <td data-label="EMAIL ADDRESS" className="email-cell">{person.email}</td>
                      <td data-label="PHONE NUMBER" className="phone-cell">
                        {person.phoneNumber || <span className="muted">Not provided</span>}
                      </td>
                      <td data-label="ACTIONS">
                        <div className="row-actions">
                          <button
                            className="icon-button"
                            onClick={() => openEditForm(person)}
                            aria-label={`Edit ${person.name}`}
                          >
                            Edit
                          </button>
                          <button
                            className="icon-button danger"
                            onClick={() => void removePerson(person)}
                            disabled={deletingId === person.id}
                            aria-label={`Delete ${person.name}`}
                          >
                            {deletingId === person.id ? 'Deleting...' : 'Delete'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="panel-footer">
            <span>Showing <strong>{filteredPeople.length}</strong> of <strong>{people.length}</strong> people</span>
            <span className={`api-status${pageError ? ' disconnected' : loading ? ' connecting' : ''}`}>
              <span className="status-dot" />
              {pageError ? 'API unavailable' : loading ? 'Connecting...' : 'API connected'}
            </span>
          </div>
        </section>
      </main>

      <footer className="page-footer">
        <span>PEOPLESTACK</span>
        <span>Simple, thoughtful contact management.</span>
      </footer>

      {isFormOpen && (
        <PersonForm
          person={editingPerson}
          error={formError}
          saving={saving}
          onClose={closeForm}
          onSave={savePerson}
        />
      )}
    </div>
  )
}

type PersonFormProps = {
  person: Person | null
  error: string | null
  saving: boolean
  onClose: () => void
  onSave: (input: PersonInput) => Promise<void>
}

function PersonForm({ person, error, saving, onClose, onSave }: PersonFormProps) {
  const [name, setName] = useState(person?.name ?? '')
  const [email, setEmail] = useState(person?.email ?? '')
  const [phoneNumber, setPhoneNumber] = useState(person?.phoneNumber ?? '')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    void onSave({
      name: name.trim(),
      email: email.trim(),
      phoneNumber: phoneNumber.trim() || null,
    })
  }

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        className="person-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="form-title"
      >
        <div className="dialog-heading">
          <div>
            <p className="eyebrow">CONTACT DETAILS</p>
            <h2 id="form-title">{person ? 'Edit person' : 'Add a person'}</h2>
            <p>Fields marked with <span className="required-mark">*</span> are required.</p>
          </div>
          <button className="close-button" type="button" onClick={onClose} aria-label="Close form">
            ×
          </button>
        </div>
        <form className="person-form" onSubmit={handleSubmit}>
          <label>
            Full name <span className="required-mark">*</span>
            <input
              autoFocus
              required
              maxLength={100}
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Alex Smith"
            />
          </label>
          <label>
            Email address <span className="required-mark">*</span>
            <input
              type="email"
              required
              maxLength={256}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="alex@example.com"
            />
          </label>
          <label>
            Phone number <span className="optional-label">OPTIONAL</span>
            <input
              type="tel"
              maxLength={32}
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
              placeholder="Add a phone number"
            />
          </label>
          {error && <p className="form-error" role="alert">{error}</p>}
          <div className="form-actions">
            <button className="button button-secondary" type="button" onClick={onClose} disabled={saving}>
              Cancel
            </button>
            <button className="button button-primary" type="submit" disabled={saving}>
              {saving ? 'Saving...' : person ? 'Save changes' : 'Add person'}
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default App
