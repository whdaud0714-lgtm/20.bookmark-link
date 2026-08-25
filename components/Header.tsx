import Logo from "./Logo";
import NewLinkButton from "./NewLinkButton";

export default function Header() {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between bg-[var(--card-bg)] px-5 shadow-[0_1px_0_rgba(0,0,0,0.06)]">
      <Logo />
      <NewLinkButton />
    </header>
  );
}
