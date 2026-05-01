
type User = {
    id: number;
    textColor: string;
    initials: string;
}

const SocialProof = () => {
    const users: User[] = [
        { id: 1, textColor: 'text-violet', initials: "SK" },
        { id: 2, textColor: 'text-teal', initials: "MR" },
        { id: 3, textColor: 'text-gold', initials: "AL" },
        { id: 4, textColor: 'text-brand', initials: "JD" },
        { id: 5, textColor: 'text-rose', initials: "PK" },
    ]

    return (
        <div className='mr-4'>
            <div className="flex -space-x-2">
                {users.map(user => (
                    <div
                        key={user.id}
                        className={`w-6 h-6 rounded-full bg-void border border-raised flex items-center justify-center text-[10px] font-semibold ${user.textColor}`}
                    >
                        {user.initials}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SocialProof;