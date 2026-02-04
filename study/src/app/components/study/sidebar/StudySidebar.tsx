"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import FilterModal from "./FilterModal";
import CreateGroupModal from "./CreateModal";

import {
  Home,
  GraduationCap,
  Search,
  Star,
  Users,
  UserPlus,
  User,
} from "lucide-react";

type SidebarItem = {
  name: string;
  path?: string;
  action?: "filter" | "create";
  icon: React.ReactNode;
};

const StudySidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  // ✅ modal states
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);

  // ✅ hydration fix
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleItemClick = (item: SidebarItem) => {
    if (item.action === "filter") {
      setIsFilterOpen(true);
      return;
    }

    if (item.action === "create") {
      setIsCreateGroupOpen(true);
      return;
    }

    if (item.path) {
      router.push(item.path);
    }
  };

  const sidebarSections = [
    {
      title: "Community",
      items: [
        {
          name: "My Groups",
          path: "/study/my-groups",
          icon: <GraduationCap size={18} />,
        },
        {
          name: "Filter Groups",
          action: "filter",
          icon: <Search size={18} />,
        },
        {
          name: "Create Group",
          action: "create",
          icon: <UserPlus size={18} />,
        },
      ],
    },
    {
      title: "Planning",
      items: [
        {
          name: "Timer",
          path: "/study/timer",
          icon: <Home size={18} />,
        },
        {
          name: "Goals",
          path: "/study/habits",
          icon: <Star size={18} />,
        },
        {
          name: "Todo",
          path: "/study/todo",
          icon: <Star size={18} />,
        },
      ],
    },
    {
      title: "Profile",
      items: [
        {
          name: "My Profile",
          path: "/profile",
          icon: <User size={18} />,
        },
        {
          name: "Dashboard",
          path: "/student/dashboard",
          icon: <Users size={18} />,
        },
      ],
    },
  ];

  return (
    <>
      {/* SIDEBAR */}
      <aside className="fixed left-0 top-0 h-screen w-64 md:w-72 bg-[#f7f3ee] p-6 shadow-sm">
        <h2 className="text-4xl font-bold text-[#4a3728] mb-10">Throne8</h2>

        {sidebarSections.map((section, index) => (
          <div key={index} className="mb-8">
            <h3 className="text-sm font-bold text-gray-700 uppercase mb-4">
              {section.title}
            </h3>

            <ul className="space-y-3">
              {section.items.map((item, idx) => (
                <li
                  key={idx}
                  onClick={() => handleItemClick(item)}
                  className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all
                    ${
                      pathname === item.path
                        ? "bg-[#4a3728] text-white"
                        : "text-gray-700 hover:bg-black/5"
                    }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </aside>

      {/* MODALS (render ONLY after mount) */}
      {mounted && (
        <>
          <FilterModal
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
          />

          <CreateGroupModal
            isOpen={isCreateGroupOpen}
            onClose={() => setIsCreateGroupOpen(false)}
          />
        </>
      )}
    </>
  );
};

export default StudySidebar;
