export interface WaitlistData {
  firstName: string
  lastName: string
  email: string
  businessName: string
  industry: string
  solutions: string
  features: string
}

export async function submitToWaitlist(data: WaitlistData) {
  const response = await fetch('/api/waitlist', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || 'Failed to submit to waitlist')
  }

  return await response.json()
}
