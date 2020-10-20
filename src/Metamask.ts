import {
  Authenticator,
  ButtonStyle,
  Chain,
  UALError,
  User,
} from 'universal-authenticator-library'
import { Logo } from './Logo'

export enum CONSTANTS {
  onBoardingLink = 'https://www.google.es',
  white = '#fff',
  black = '#000',
}

export const Name = 'Metamask'

export interface MetamaskOptions {
  appName: string
}

export class Metamask extends Authenticator {
  private onBoardingLink: string = CONSTANTS.onBoardingLink
  private users: User[] = []
  public chains: Chain[]
  public options?: MetamaskOptions

  /**
   * Metamask Constructor.
   *
   * @param chains
   * @param options { appName } appName is a optional to use Metamask
   */
  constructor(chains: Chain[], options?: MetamaskOptions) {
    super(chains, options)
    this.chains = chains
  }

  private isMobile(): boolean {
    const userAgent = window.navigator.userAgent
    const isIOS = userAgent.includes('iPhone') || userAgent.includes('iPad')
    const isMobile = userAgent.includes('Mobile')
    const isAndroid = userAgent.includes('Android')
    const isCustom = userAgent.toLowerCase().includes('eoslynx')

    return isIOS || isMobile || isAndroid || isCustom
  }

  public async init(): Promise<void> {
    console.info('Metamask initialized!')
  }

  /**
   * Metamask will only work with ssl secured websites
   */
  public shouldRender(): boolean {
    if (this.isMobile()) {
      return false
    }

    return true
  }

  public async shouldRequestAccountName(): Promise<boolean> {
    return true
  }

  /**
   * Connect to the ledger and request Keys
   *
   */
  public async login(): Promise<User[]> {
    // alert?

    return this.users
  }

  public async logout(): Promise<void> {
  }

  public getStyle(): ButtonStyle {
    return {
      icon: Logo,
      text: Name,
      textColor: CONSTANTS.white,
      background: CONSTANTS.white,
    }
  }

  public isLoading(): boolean {
    return false
  }

  public isErrored(): boolean {
    return false
  }

  public getError(): UALError | null {
    return null
  }

  public getOnboardingLink(): string {
    return this.onBoardingLink
  }

  public reset(): void {
    return
  }

  public requiresGetKeyConfirmation(accountName?: string): boolean {
    if (!accountName) {
      return true
    }
    return true
  }

  public getName(): string {
    return Name
  }

  shouldAutoLogin(): boolean {
    return false;
  }
}
