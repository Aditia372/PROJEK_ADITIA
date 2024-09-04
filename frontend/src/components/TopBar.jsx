import  { Fragment } from 'react';
import {
    Bars3CenterLeftIcon,
    PencilIcon,
    ChevronDownIcon,
    CreditCardIcon,
    Cog8ToothIcon,
} from "@heroicons/react/24/solid";
import { BellIcon, CheckIcon } from "@heroicons/react/24/outline";
import { Menu, Transition, Popover } from "@headlessui/react";
import { Link } from 'react-router-dom';


// eslint-disable-next-line react/prop-types
const TopBar = ({ showNav, setShowNav }) => {
    return (
        <div className={`fixed w-full h-16 flex justify-between items-center transition-all duration-[400ms] ${showNav ? "pl-56" : ""}`}>
            <div className="pl-4 md:pl-16">
                <Bars3CenterLeftIcon
                    className="h-8 w-8 text-gray-700 cursor-pointer"
                    onClick={() => setShowNav(!showNav)}
                />
            </div>
            <div className='flex items-center pr-4 md:pr-16'>
                <Menu as="div" className="relative inline-block text-left">
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform scale-95"
                        enterTo="transform scale-100"
                        leave="transition ease-in duration=75"
                        leaveFrom="transform scale-100"
                        leaveTo="transform scale-95"
                    >
                    </Transition>
                </Menu>
            </div>
        </div>
    );
};

export default TopBar;