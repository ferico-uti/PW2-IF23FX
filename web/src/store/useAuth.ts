import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// buat type untuk auth
type AuthProps = {
  isLogin: boolean;
  username: string | null;
  error: string | null;
  hasHydrated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
};

// buat variabel useAuth yang berisi fungsi
export const useAuth = create<AuthProps>()(
  persist(
    (set) => ({
      isLogin: false,
      username: null,
      error: null,
      hasHydrated: false,

      //   buat state untuk login
      login: (username, password) => {
        // jika username dan password sesuai
        if (username === "admin" && password === "admin") {
          // simpan state (benar)
          set({
            isLogin: true,
            username: "admin",
            error: null,
          });
          return true;
        } else {
          // simpan state (salah)
          set({
            error: "Username atau password salah",
          });
          return false;
        }
      },

      //   buat state untuk logout
      logout: () => {
        set({
          isLogin: false,
          username: null,
          error: null,
        });
      },
    }),
    // simpan key di localStorage
    {
      name: "auth",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hasHydrated = true;
        }
      },
    }
  )
);
