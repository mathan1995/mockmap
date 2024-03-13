import { FileListContext } from "@/app/_context/FilesListContext";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Archive, MoreHorizontal } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

import { SlGrid, SlList } from "react-icons/sl";

export interface FILE {
  archive: boolean;
  createdBt: string;
  document: string;
  fileName: string;
  teamId: string;
  whiteboard: string;
  _id: string;
  _creationTime: number;
}
function FileList() {
  const { fileList_, setFileList_ } = useContext(FileListContext);
  const [fileList, setFileList] = useState<any>();
  const [toggle, setToggle] = useState<any>(true);
  const { user }: any = useKindeBrowserClient();
  const router = useRouter();
  useEffect(() => {
    fileList_ && setFileList(fileList_);
    console.log(fileList_);
  }, [fileList_]);

  return (
    <div className="mt-1">
      <div className="overflow-x-auto">
        <button
          className={`focus:outline-none text-white bg-purple-700 hover:bg-purple-800 m-1 rounded-sm font-medium  text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 ${toggle} bg-gray-700`}
          onClick={() => {
            setToggle(false);
          }}
        >
          <SlList />
        </button>
        <button
          className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 m-1 rounded-sm font-medium  text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 "
          onClick={() => {
            setToggle(true);
          }}
        >
          <SlGrid />
        </button>

        <section>
          {toggle ? (
            <div>
              <div className="mx-auto px-4 text-gray-500">
                <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-1 border-red-300 cursor-pointer ">
                  {fileList &&
                    fileList.map((file: FILE, index: number) => (
                      <div
                        key={index}
                        onClick={() => router.push("/workspace/" + file._id)}
                        className="relative group overflow-hidden p-8 rounded-xl bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900"
                      >
                        <div
                          aria-hidden="true"
                          className="inset-0 absolute aspect-video border rounded-full -translate-y-1/2 group-hover:-translate-y-1/4 duration-300 bg-gradient-to-b from-blue-500 to-white dark:from-white dark:to-white blur-2xl opacity-25 dark:opacity-5 dark:group-hover:opacity-10"
                        ></div>
                        <div className="relative">
                          <div className="border border-blue-500/10 flex relative *:relative *:size-6 *:m-auto size-12 rounded-lg dark:bg-gray-900 dark:border-white/15 before:rounded-[7px] before:absolute before:inset-0 before:border-t before:border-white before:from-blue-100 dark:before:border-white/20 before:bg-gradient-to-b dark:before:from-white/10 dark:before:to-transparent before:shadow dark:before:shadow-gray-950">
                            {user && (
                              <Image
                                src={user?.picture}
                                alt="user"
                                width={30}
                                height={30}
                                className="rounded-full"
                              />
                            )}
                          </div>

                          <div className="mt-6 pb-6 rounded-b-[--card-border-radius]">
                            <h1 className="text-gray-700 dark:text-gray-300">
                              {file.fileName}
                            </h1>
                          </div>

                          <div className="flex gap-3 -mb-8 py-4 border-t border-gray-200 dark:border-gray-800">
                            <a className="group rounded-xl disabled:border *:select-none [&>*:not(.sr-only)]:relative *:disabled:opacity-20 disabled:text-gray-950 disabled:border-gray-200 disabled:bg-gray-100 dark:disabled:border-gray-800/50 disabled:dark:bg-gray-900 dark:*:disabled:!text-white text-gray-950 bg-gray-100 hover:bg-gray-200/75 active:bg-gray-100 dark:text-white dark:bg-gray-500/10 dark:hover:bg-gray-500/15 dark:active:bg-gray-500/10 flex gap-1.5 items-center text-sm h-8 px-3.5 justify-center">
                              <span>
                                Created-
                                {moment(file._creationTime).format(
                                  "DD MMM YYYY"
                                )}{" "}
                              </span>
                            </a>
                            <a className="group rounded-xl disabled:border *:select-none [&>*:not(.sr-only)]:relative *:disabled:opacity-20 disabled:text-gray-950 disabled:border-gray-200 disabled:bg-gray-100 dark:disabled:border-gray-800/50 disabled:dark:bg-gray-900 dark:*:disabled:!text-white text-gray-950 bg-gray-100 hover:bg-gray-200/75 active:bg-gray-100 dark:text-white dark:bg-gray-500/10 dark:hover:bg-gray-500/15 dark:active:bg-gray-500/10 flex gap-1.5 items-center text-sm h-8 px-3.5 justify-center">
                              <span>
                                Edited-
                                {moment(file._creationTime).format(
                                  "DD MMM YYYY"
                                )}{" "}
                              </span>
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ) : (
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead className="ltr:text-left rtl:text-right">
                <tr>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    File Name
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Created At
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Edited
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Author
                  </td>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {fileList &&
                  fileList.map((file: FILE, index: number) => (
                    <tr
                      key={index}
                      className="odd:bg-gray-50 cursor-pointer"
                      onClick={() => router.push("/workspace/" + file._id)}
                    >
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        {file.fileName}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {moment(file._creationTime).format("DD MMM YYYY")}{" "}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {moment(file._creationTime).format("DD MMM YYYY")}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {user && (
                          <Image
                            src={user?.picture}
                            alt="user"
                            width={30}
                            height={30}
                            className="rounded-full"
                          />
                        )}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <MoreHorizontal />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem className="gap-3">
                              <Archive className="h-4 w-4" /> Archive
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </div>
  );
}

export default FileList;
