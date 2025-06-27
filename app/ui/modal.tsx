import React from 'react';
import { PromptOption } from '@/app/lib/definitions';

export interface ModalProps extends React.PropsWithChildren {
    isOpen: boolean;
    onClose: ()=>void;
}

export const Modal = (props: ModalProps) => {
    const {isOpen, onClose, children} = props;
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex
                        items-center justify-center mt-16">
            <div className="bg-white rounded-lg
                            shadow-lg p-6 max-w-md
                            w-80 relative mt-3">
                <button
                    className="absolute top-2 right-2
                               text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    &#x2715; {/* Close button */}
                </button>
                {children}
            </div>
        </div>
    );
};

export interface OptionRemovalModalProps {
    isOpen: boolean;
    onClose: () => void;
    onRemoveOption: () => void;
    option: PromptOption;
}

export const OptionRemovalModal = (props: OptionRemovalModalProps) => {
    const {isOpen, onClose, onRemoveOption, option} = props;
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="text-lg font-bold">Option Removal</h2>
            <p className="text-gray-700">
                Remove {option.title} from prompt?
                </p>
            <button
                className="mt-4 px-4 py-2
                           bg-blue-500 text-white
                           rounded-lg"
                onClick={onRemoveOption}
            >
                OK
            </button>
            <button
                className="mt-4 px-4 py-2
                           bg-red-500 text-white
                           rounded-lg"
                onClick={onClose}
            >
                Cancel
            </button>
        </Modal>
    );
};
