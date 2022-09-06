import {useSession} from "next-auth/react";
import Head from "../components/head";
import CenterLayout from "../layouts/center-layout";
import classNames from "classnames";
import {useState} from "react";
import {trpc} from "../utils/trpc";
import AsyncButton from "../components/common/async-button";
import { Search, CheckCircle } from "react-feather"
import {z} from "zod";
import ErrorAlert from "../components/common/alerts/error-alert";
import {randomIntRange} from "../utils/math";
import { useRouter } from "next/router";


export default function CreateProfile() {
  const session = useSession()
  const router = useRouter()

  const [name, setName] = useState("")

  const {isLoading, mutate, data, reset, error} = trpc.useMutation("gachamon.check-name")
  const createMutation = trpc.useMutation("gachamon.create-profile", {
    onSuccess: () => router.push("/")
  })
  const possibleNames = ["AsheKetchup", "BasedJames", "TrustyFryingPanAsADryingPan"]

  return <>
    <Head title={"Create Profile - Gachamon"} description={"Gachamon create profile!"}/>
    {
      session.status == "authenticated" &&
        <CenterLayout>
          {
            error && <ErrorAlert msg={parseErrMsg()} className={"mb-4"}/>
          }
          <div className={"flex flex-col gap-3"}>
            <h3 className="text-xl font-mono">All right. What&apos;s your name?</h3>
            <div className="input-group">
              <input
                type="text"
                className={classNames("input w-full", {"input-success": data})}
                value={name}
                placeholder={possibleNames[randomIntRange(0, possibleNames.length)]}
                onChange={e => {
                  setName(e.target.value)
                  reset()
                }}
              />
              <AsyncButton
                loading={isLoading}
                className={"btn-square"}
                onClick={() => mutate(name)}
              >
                <Search />
              </AsyncButton>
            </div>
            {
              data && <AsyncButton
                className={"btn btn-primary gap-2"}
                loading={createMutation.isLoading}
                onClick={() => createMutation.mutate(name)}
              ><CheckCircle size={16}/> Create</AsyncButton>
            }
          </div>
        </CenterLayout>
    }
  </>

  function parseErrMsg() {
    const {errors} = new z.ZodError(JSON.parse(error?.message ?? "{}"))
    return errors[0]?.message ?? "Error checking name"
  }
}

