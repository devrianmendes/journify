import { SignUpForm } from '@/components/sign-up-form'

export default function Page() {
  return (
    <div className="flex justify-center items-center min-h-svh w-full p-6 md:p-10">
      <div className="w-full max-w-sm h-3/5">
        <SignUpForm />
      </div>
    </div>
  )
}
