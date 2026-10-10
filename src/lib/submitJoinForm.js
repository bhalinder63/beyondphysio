// Single integration point for "Join the community" submissions.
// TODO: replace the body with the database insert or EmailJS `send()` call.
export async function submitJoinForm(data) {
  console.info('[join] submission', data)
  await new Promise((resolve) => setTimeout(resolve, 600))
}
