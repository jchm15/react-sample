// menuData.ts
export interface MenuList {
    title: string;
    path: string;
}

export const menuData: MenuList[] = [
    { title: "Home", path: "/" },
    { title: "Movie", path: "/movies" },
    { title: "UserList", path: "/user" },
    { title: "Typing", path: "/typing" },
    { title: "ChatApp", path: "/chatApp" },
];