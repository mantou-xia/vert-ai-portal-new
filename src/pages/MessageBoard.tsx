import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getAssetPath } from '../utils/path';
import './MessageBoard.css';

interface MessageBoardProps {
  open: boolean;
  onClose: () => void;
}

type MessageBoardView = 'editing' | 'success';

interface FormState {
  contactName: string;
  phone: string;
  wechat: string;
}

type FormErrors = Partial<Record<'contactName' | 'phone', string>>;

const INITIAL_FORM: FormState = {
  contactName: '',
  phone: '',
  wechat: '',
};

const LOGO_SRC = getAssetPath('/images/message-board/logo-union.svg');
const QR_SRC = getAssetPath('/images/message-board/qr.png');
const SUCCESS_SRC = getAssetPath('/images/message-board/success.svg');

const MessageBoard: React.FC<MessageBoardProps> = ({ open, onClose }) => {
  const { t } = useTranslation();
  const [view, setView] = useState<MessageBoardView>('editing');
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});

  const resetState = useCallback(() => {
    setView('editing');
    setForm(INITIAL_FORM);
    setErrors({});
  }, []);

  const handleClose = useCallback(() => {
    resetState();
    onClose();
  }, [onClose, resetState]);

  useEffect(() => {
    if (!open) {
      resetState();
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, handleClose, resetState]);

  const handleChange =
    (field: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
      if (field === 'contactName' || field === 'phone') {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: FormErrors = {};
    if (!form.contactName.trim()) {
      nextErrors.contactName = t('messageBoard.contactNameRequired');
    }
    if (!form.phone.trim()) {
      nextErrors.phone = t('messageBoard.phoneRequired');
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setView('success');
  };

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  if (!open) {
    return null;
  }

  return (
    <div className="message-board" onClick={handleOverlayClick} role="presentation">
      <div className="message-board__dialog" role="dialog" aria-modal="true" aria-label={t('messageBoard.title')}>
        <section className="message-board__left">
          <div className="message-board__logo-wrap">
            <img src={LOGO_SRC} alt="VERT" className="message-board__logo" />
            <p className="message-board__logo-text">VERT</p>
          </div>
          <div className="message-board__qr-wrap">
            <div className="message-board__qr-panel">
              <img src={QR_SRC} alt={t('messageBoard.qrAlt')} className="message-board__qr-img" />
            </div>
            <p className="message-board__qr-text">
              <span>{t('messageBoard.qrTextPrefix')}</span>
              <span className="message-board__qr-highlight">{` ${t('messageBoard.qrTextHighlight')} `}</span>
              <span>{t('messageBoard.qrTextSuffix')}</span>
            </p>
          </div>
        </section>

        <section className="message-board__right">
          <div className="message-board__right-inner">
            {view === 'editing' ? (
              <form className="message-board__form" onSubmit={handleSubmit} noValidate>
                <h2 className="message-board__title">
                  <span>{t('messageBoard.titleLine1')}</span>
                  <span>{t('messageBoard.titleLine2')}</span>
                </h2>
                <div className="message-board__fields">
                  <div className="message-board__field">
                    <input
                      value={form.contactName}
                      onChange={handleChange('contactName')}
                      placeholder={t('messageBoard.contactNamePlaceholder')}
                      className={`message-board__input message-board__input--name${errors.contactName ? ' message-board__input--error' : ''}`}
                      aria-invalid={Boolean(errors.contactName)}
                    />
                    {errors.contactName ? <p className="message-board__error">{errors.contactName}</p> : null}
                  </div>
                  <div className="message-board__field">
                    <input
                      value={form.phone}
                      onChange={handleChange('phone')}
                      placeholder={t('messageBoard.phonePlaceholder')}
                      className={`message-board__input message-board__input--default${errors.phone ? ' message-board__input--error' : ''}`}
                      aria-invalid={Boolean(errors.phone)}
                    />
                    {errors.phone ? <p className="message-board__error">{errors.phone}</p> : null}
                  </div>
                  <div className="message-board__field">
                    <input
                      value={form.wechat}
                      onChange={handleChange('wechat')}
                      placeholder={t('messageBoard.wechatPlaceholder')}
                      className="message-board__input message-board__input--default"
                    />
                  </div>
                </div>
                <button type="submit" className="message-board__submit">
                  {t('messageBoard.submit')}
                </button>
              </form>
            ) : (
              <div className="message-board__success">
                <img src={SUCCESS_SRC} alt="" aria-hidden="true" className="message-board__success-icon" />
                <p className="message-board__success-title">{t('messageBoard.successTitle')}</p>
                <p className="message-board__success-subtitle">{t('messageBoard.successSubtitle')}</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default MessageBoard;
