import React from 'react'

type Props = {
    name: string;
    buttonComponent?: any;
    isSmallText?: boolean;
}

function Header({ name, buttonComponent, isSmallText = false }: Props) {
  return (
    <div className="mb-5 flex w-full items-center justify-between">
        <h1 className={`font-semibold dark:text-white ${isSmallText ? 'text-lg' : 'text-2xl'}`}>{name}</h1>
        {buttonComponent}
    </div>
  )
}

export default Header