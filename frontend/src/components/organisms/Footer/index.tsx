import LinkItem from '@/components/atoms/LinkItem';
import Logo from '@/components/atoms/Logo';
import Subheading from '@/components/atoms/Subheading';
import Title from '@/components/atoms/Title';
import InputEmail from '@/components/molecules/InputEmail';

const Footer = () => {
  return (
    <footer className="w-full bg-black pt-12 h-[420px] ">
      <div className="px-[270px] grid grid-cols-4 gap-10 py-10">
        <div className="flex flex-col gap-4">
          <span className="text-white">
            <Logo />
          </span>
          <Subheading className="text-[16px] text-[#FAFAFA]">
            Subscribe
          </Subheading>
          <Subheading className="text-[16px] text-[#FAFAFA]">
            Get 10% off your first order
          </Subheading>
          <InputEmail />
        </div>
        <div className="flex flex-col gap-4">
          <Title level={3} className="text-[20px] font-medium text-[#FAFAFA]">
            Support
          </Title>
          <Subheading className="text-[16px] text-[#FAFAFA]">
            111 Bijoy sarani, Dhaka, DH1515, Bangladesh.
          </Subheading>
          <Subheading className="text-[16px] text-[#FAFAFA]">
            Exclusive@gmail.com
          </Subheading>
          <Subheading className="text-[16px] text-[#FAFAFA]">
            +88015-888888-9999
          </Subheading>
        </div>
        <div className="flex flex-col gap-4">
          <Title level={4} className="text-[20px] font-medium text-[#FAFAFA]">
            Account
          </Title>
          <Subheading className="text-[16px] text-[#FAFAFA]">
            <LinkItem href="/account">My account</LinkItem>
          </Subheading>
          <Subheading className="text-[16px] text-[#FAFAFA]">
            <LinkItem href="/login">Login / Register</LinkItem>
          </Subheading>
          <Subheading className="text-[16px] text-[#FAFAFA]">
            <LinkItem href="/cart">Cart</LinkItem>
          </Subheading>
          <Subheading className="text-[16px] text-[#FAFAFA]">
            <LinkItem href="/wish-list">Wishlist</LinkItem>
          </Subheading>
          <Subheading className="text-[16px] text-[#FAFAFA]">
            <LinkItem href="/">Shop</LinkItem>
          </Subheading>
        </div>
        <div className="flex flex-col gap-4">
          <Title level={5} className="text-[20px] font-medium text-[#FAFAFA]">
            <LinkItem href="/">Quick Link</LinkItem>
          </Title>
          <Subheading className="text-[16px] text-[#FAFAFA]">
            <LinkItem href="/">Privacy Policy</LinkItem>
          </Subheading>
          <Subheading className="text-[16px] text-[#FAFAFA]">
            <LinkItem href="/">Terms of Use</LinkItem>
          </Subheading>
          <Subheading className="text-[16px] text-[#FAFAFA]">
            <LinkItem href="/">FAQ</LinkItem>
          </Subheading>
          <Subheading className="text-[16px] text-[#FAFAFA]">
            <LinkItem href="/">Contact</LinkItem>
          </Subheading>
        </div>
      </div>
      <div className="flex text-white justify-center items-center w-full border-t-[1px] border-gray-300 pt-4">
        <Subheading className="text-[16px] text-[#FAFAFA]">
          Made by{' '}
          <LinkItem href="https://github.com/gbnunes7" target="_noblank">
            Gabriel Melo
          </LinkItem>
        </Subheading>
      </div>
    </footer>
  );
};

export default Footer;
