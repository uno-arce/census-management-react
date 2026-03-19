import React from 'react'
import Button from './button'
import useModal from '../hooks/modalHooks'
import { modalStyle } from '../styles/style'

export default function Modal() {
    const { isModalOpen, modalConfig, closeModal, handleConfirm } = useModal()
    const { title, description, confirmText, variant, icon } = modalConfig
    
    const styles = modalStyle(variant, isModalOpen)

    if (!isModalOpen) return null

    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <div className={styles.contentSection}>
                    {icon && <div className={styles.iconCircle}>{icon}</div>}
                    
                    <h3 className='text-xl font-display font-bold text-base mb-2'>{title}</h3>
                    <div className='text-base-light text-sm leading-relaxed'>
                        {description}
                    </div>
                </div>

                <div className={styles.footerSection}>
                    <button onClick={closeModal} className={styles.cancelButton}>
                        Cancel
                    </button>
                    <Button 
                        name={confirmText}
                        variant={`flex-1 py-3 text-sm text-white rounded-sm border-none ${
                            variant === 'danger' 
                                ? 'bg-red-600 hover:bg-red-700' 
                                : 'bg-accent hover:bg-accent-dark'
                        }`}
                        call={handleConfirm}
                    />
                </div>
            </div>
        </div>
    )
}