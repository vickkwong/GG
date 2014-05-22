//
//  LoginViewController.m
//  Rainbros
//
//  Created by Victoria Kwong on 5/19/14.
//  Copyright (c) 2014 Victoria. All rights reserved.
//

#import "LoginViewController.h"
#import "CreateMessageViewController.h"
#import "ViewAllMessagesViewController.h"

@interface LoginViewController ()//<NSURLConnectionDelegate>
@property (weak, nonatomic) IBOutlet UITextField *usernameField;
@property (weak, nonatomic) IBOutlet UITextField *passwordField;
@property (weak, nonatomic) IBOutlet UILabel *errorMessageField;
@end

@implementation LoginViewController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    // Do any additional setup after loading the view.
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (IBAction)login:(id)sender {
    [self.usernameField resignFirstResponder];
    [self.passwordField resignFirstResponder];
    NSString *loginURL = [[NSString alloc]initWithFormat:@"%@%@%@%@", @"http://www.stanford.edu/~vkwong/cgi-bin/Rainbros/login.php?username=", self.usernameField.text, @"&password=", self.passwordField.text];
    
    NSLog(@"%@", loginURL);
    
    NSURLRequest *request = [NSURLRequest requestWithURL:[NSURL URLWithString:loginURL]];
    
    NSURLResponse *response = (NSURLResponse *)request;
    
    NSError *e;
    NSData *data = [NSURLConnection sendSynchronousRequest:request returningResponse:&response error:&e];
    
//    NSString *strResult = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
    
    NSDictionary *jsonDict = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingAllowFragments error:&e];
    
    NSLog(@"%d", [jsonDict count]);
    
    if ([jsonDict count] > 0) {
        [self performSegueWithIdentifier:@"loginSuccessful" sender:self];
    } else {
        self.errorMessageField.text = @"Username and/or password incorrect.";
    }
}

- (IBAction)registerNewUser:(id)sender {
    [self.usernameField resignFirstResponder];
    [self.passwordField resignFirstResponder];
    NSString *registerURL = [[NSString alloc]initWithFormat:@"%@%@%@%@", @"http://www.stanford.edu/~vkwong/cgi-bin/Rainbros/register.php?username=", self.usernameField.text, @"&password=", self.passwordField.text];
    
    NSLog(@"%@", registerURL);
    
    NSURLRequest *request = [NSURLRequest requestWithURL:[NSURL URLWithString:registerURL]];
    
    NSURLResponse *response = (NSURLResponse *)request;
    
    NSError *e;
    NSData *data = [NSURLConnection sendSynchronousRequest:request returningResponse:&response error:&e];
    NSString *strResult = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
    NSLog(@"%@", strResult);
    if ([strResult isEqualToString:@"SUCCESS"]) {
        [self performSegueWithIdentifier:@"loginSuccessful" sender:self];
    } else {
        self.errorMessageField.text = @"Could not create account with that username";
    }
}

//# pragma NSURLConnection Methods
//
//- (void)connection:(NSURLConnection *)connection didReceiveResponse:(NSURLResponse *)response{
//    
//    NSLog(@"received response");
//}
//
//- (void)connection:(NSURLConnection *)connection didReceiveData:(NSData *)data{
//    
//    NSLog(@"%@", data);
//    
//}
//
//- (void)connection:(NSURLConnection *)connection didFailWithError:(NSError *)error {
//    // Do cleanup
//    NSLog(@"ERROR");
//}
//
//- (void)connectionDidFinishLoading:(NSURLConnection *)connection {
//    NSLog(@"Succeeded!");
//}


- (IBAction)hideKeyboard:(id)sender {
    [self.view endEditing:YES];
}


#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender
{
    if ([segue.identifier isEqualToString:@"loginSuccessful"]) {
//        if ([[segue.destinationViewController topViewController] isKindOfClass:[CreateMessageViewController class]]) {
        if ([segue.destinationViewController isKindOfClass:[ViewAllMessagesViewController class]]) {
//            CreateMessageViewController *dest = (CreateMessageViewController *)[segue.destinationViewController topViewController];
            ViewAllMessagesViewController *dest = (ViewAllMessagesViewController *)segue.destinationViewController;
            dest.userName = self.usernameField.text;
//            NSLog(@"LOGIN TO CREATE: %@", dest.userName);
        }
    }
}

#pragma mark - TextField
- (BOOL)textFieldShouldReturn:(UITextField *)textField {
    [self.view endEditing:YES];
    return YES;
}


@end
